#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
// Load .env and validate DATABASE_URL, provide clear errors if missing
const dotenv = require('dotenv');
dotenv.config({ path: process.env.DOTENV_PATH || '.env' });

const { Pool } = require('pg');
const fetch = globalThis.fetch || require('node-fetch');
const path = require('path');

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in environment. Please set it or add it to .env');
  process.exit(2);
}

try {
  // Basic validation of URL and password presence
  const dbUrl = new URL(process.env.DATABASE_URL.replace(/^"|"$/g, ''));
  if (!dbUrl.password) {
    console.error('DATABASE_URL appears to be missing a password. Check your .env or environment variable.');
    process.exit(2);
  }
} catch (e) {
  console.error('DATABASE_URL is not a valid URL:', e.message || e);
  process.exit(2);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL.replace(/^"|"$/g, '') });

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchByIsbn(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Books fetch failed: ${res.status}`);
  const data = await res.json();
  return data.items && data.items.length ? data.items[0].volumeInfo : null;
}

async function fetchByTitle(title) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Books fetch failed: ${res.status}`);
  const data = await res.json();
  return data.items && data.items.length ? data.items[0].volumeInfo : null;
}

async function run() {
  const arg = process.argv[2];
  const limit = arg ? parseInt(arg, 10) : 100;
  const offsetArg = process.argv[3];
  const offset = offsetArg ? parseInt(offsetArg, 10) : 0;

  console.log(`Batch metadata fetch starting (limit=${limit}, offset=${offset})`);

  const sql = `SELECT id, title, isbn FROM "Ebook" ORDER BY id ASC LIMIT $1 OFFSET $2`;
  const res = await pool.query(sql, [limit, offset]);
  const rows = res.rows;

  const results = { total: rows.length, updated: 0, failed: [] };

  for (let i = 0; i < rows.length; i++) {
    const ebook = rows[i];
    try {
      let info = null;
      if (ebook.isbn) {
        try { info = await fetchByIsbn(ebook.isbn); } catch (e) { info = null; }
      }
      if (!info && ebook.title) {
        try { info = await fetchByTitle(ebook.title); } catch (e) { info = null; }
      }

      if (!info) {
        results.failed.push({ id: ebook.id, reason: 'No Google Books result' });
        console.log(`(${i+1}/${rows.length}) [${ebook.id}] No result`);
        await delay(200); // polite delay
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

      results.updated++;
      console.log(`(${i+1}/${rows.length}) [${ebook.id}] Updated from Google Books`);
      await delay(300); // small delay to avoid rate limits
    } catch (err) {
      results.failed.push({ id: ebook.id, reason: err.message || String(err) });
      console.error(`(${i+1}/${rows.length}) [${ebook.id}] Failed:`, err.message || err);
      await delay(300);
    }
  }

  console.log('Done:', results);
  await pool.end();
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(2);
});
