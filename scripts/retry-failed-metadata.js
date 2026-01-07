#!/usr/bin/env node
// Retry metadata enrichment for ebooks that still miss metadata
/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require('dotenv');
dotenv.config({ path: process.env.DOTENV_PATH || '.env' });

const { Pool } = require('pg');
const fetch = globalThis.fetch || require('node-fetch');
const fs = require('fs');

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in environment. Please set it or add it to .env');
  process.exit(2);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL.replace(/^"|"$/g, '') });

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

async function fetchGoogleBooks(q) {
  try {
    const key = process.env.GOOGLE_BOOKS_KEY ? `&key=${encodeURIComponent(process.env.GOOGLE_BOOKS_KEY)}` : '';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GB fetch ${res.status}`);
    const data = await res.json();
    return data.items && data.items.length ? data.items[0].volumeInfo : null;
  } catch (e) {
    return null;
  }
}

function normalizeTitle(title) {
  if (!title) return '';
  return title.replace(/\s*[:\-–—]\s*.*/g, '') // remove subtitle after colon/dash
    .replace(/[^\w\s]/g, ' ') // strip punctuation
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
}

async function tryVariants(ebook) {
  // Try by ISBN first
  if (ebook.isbn) {
    const info = await fetchGoogleBooks(`isbn:${encodeURIComponent(ebook.isbn)}`);
    if (info) return info;
  }

  const variants = [];
  if (ebook.title) {
    variants.push(`intitle:${encodeURIComponent(ebook.title)}`);
    const norm = normalizeTitle(ebook.title);
    if (norm && norm !== ebook.title) variants.push(`intitle:${encodeURIComponent(norm)}`);
    const firstWords = norm.split(' ').slice(0, 6).join(' ');
    if (firstWords) variants.push(`intitle:${encodeURIComponent(firstWords)}`);
  }

  // try each variant
  for (const v of variants) {
    const info = await fetchGoogleBooks(v);
    if (info) return info;
    await delay(250);
  }

  return null;
}

async function run() {
  const arg = process.argv[2];
  const limit = arg ? parseInt(arg, 10) : 500;
  const offsetArg = process.argv[3];
  const offset = offsetArg ? parseInt(offsetArg, 10) : 0;

  console.log(`Retry metadata fetch (limit=${limit}, offset=${offset})`);

  const sql = `SELECT id, title, isbn, author, "coverImage", description FROM "Ebook" WHERE (author IS NULL OR "coverImage" IS NULL OR description IS NULL) ORDER BY id ASC LIMIT $1 OFFSET $2`;
  const res = await pool.query(sql, [limit, offset]);
  const rows = res.rows;

  const failed = [];
  let updated = 0;

  for (let i = 0; i < rows.length; i++) {
    const ebook = rows[i];
    try {
      const info = await tryVariants(ebook);
      if (!info) {
        failed.push({ id: ebook.id, title: ebook.title || '', isbn: ebook.isbn || '', reason: 'No Google Books result' });
        console.log(`(${i+1}/${rows.length}) [${ebook.id}] No result`);
        await delay(200);
        continue;
      }

      const authors = info.authors ? info.authors.join(', ') : null;
      const publisher = info.publisher || null;
      const publishYear = info.publishedDate ? parseInt(String(info.publishedDate).substring(0,4)) || null : null;
      const pages = info.pageCount || null;
      const language = info.language || null;
      const description = info.description || null;
      const category = Array.isArray(info.categories) && info.categories.length ? info.categories[0] : null;
      const cover = info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail) : null;
      const coverUrl = cover ? String(cover).replace('http://', 'https://') : null;

      const updateSql = `UPDATE "Ebook" SET title = COALESCE($1, title), author = COALESCE($2, author), publisher = COALESCE($3, publisher), "publishYear" = COALESCE($4, "publishYear"), pages = COALESCE($5, pages), language = COALESCE($6, language), description = COALESCE($7, description), category = COALESCE($8, category), "coverImage" = COALESCE($9, "coverImage") WHERE id = $10`;
      await pool.query(updateSql, [info.title || null, authors, publisher, publishYear, pages, language, description, category, coverUrl, ebook.id]);

      updated++;
      console.log(`(${i+1}/${rows.length}) [${ebook.id}] Updated (retry)`);
      await delay(300);
    } catch (err) {
      failed.push({ id: ebook.id, title: ebook.title || '', isbn: ebook.isbn || '', reason: err.message || String(err) });
      console.error(`(${i+1}/${rows.length}) [${ebook.id}] Failed:`, err.message || err);
      await delay(300);
    }
  }

  // write CSV of failures for manual review
  if (failed.length) {
    const csv = ['id,title,isbn,reason'].concat(failed.map(f => `${f.id},"${(f.title||'').replace(/"/g,'""')}",${f.isbn||''},"${(f.reason||'').replace(/"/g,'""') }"`)).join('\n');
    fs.writeFileSync('failed-metadata.csv', csv);
    console.log(`Wrote failed-metadata.csv (${failed.length} rows)`);
  } else {
    console.log('No failures to write.');
  }

  console.log({ total: rows.length, updated, failed: failed.length });
  await pool.end();
}

run().catch(err => { console.error('Fatal:', err); process.exit(2); });
