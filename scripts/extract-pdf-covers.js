#!/usr/bin/env node
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const sharp = require('sharp');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    const arg = process.argv[2];
    const limit = arg ? parseInt(arg, 10) : undefined;

    const vals = [];
    let sql = 'SELECT id, title, slug, "fileUrl", "coverImage" FROM "Ebook" WHERE "fileUrl" LIKE $1';
    vals.push('/ebooks/%');
    if (limit && Number.isInteger(limit) && limit > 0) {
      sql += ' LIMIT $2';
      vals.push(limit);
    }
    const res = await pool.query(sql, vals);
    const ebooks = res.rows;

    const results = { total: ebooks.length, extracted: 0, failed: [], updated: [] };

    const coversDir = path.join(process.cwd(), 'public', 'covers');
    if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

    for (const ebook of ebooks) {
      try {
        if (!ebook.fileUrl || !ebook.fileUrl.startsWith('/ebooks/')) {
          results.failed.push(`${ebook.title}: No local PDF`);
          continue;
        }

        const filename = path.basename(ebook.fileUrl);
        const pdfPath = path.join(process.cwd(), 'public', 'ebooks', filename);
        if (!fs.existsSync(pdfPath)) {
          results.failed.push(`${ebook.title}: PDF not found`);
          continue;
        }

        const tempPpmPath = path.join(coversDir, `${ebook.slug}-temp`);
        try {
          await execAsync(
            `pdftoppm -f 1 -l 1 -scale-to 800 -singlefile -jpeg "${pdfPath}" "${tempPpmPath}"`,
            { timeout: 30000 }
          );

          const tempJpgPath = `${tempPpmPath}.jpg`;
          if (!fs.existsSync(tempJpgPath)) throw new Error('Failed to generate cover image');

          const coverFileName = `${ebook.slug}.jpg`;
          const coverPath = path.join(coversDir, coverFileName);

          await sharp(tempJpgPath)
            .resize(600, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .jpeg({ quality: 90 })
            .toFile(coverPath);

          fs.unlinkSync(tempJpgPath);

          await pool.query('UPDATE "Ebook" SET "coverImage" = $1 WHERE id = $2', [`/covers/${coverFileName}`, ebook.id]);

          results.extracted++;
          results.updated.push(ebook.title);
        } catch (err) {
          const msg = err && err.message ? err.message : String(err);
          results.failed.push(`${ebook.title}: ${msg}`);
          const tempJpgPath = `${tempPpmPath}.jpg`;
          if (fs.existsSync(tempJpgPath)) fs.unlinkSync(tempJpgPath);
        }

      } catch (e) {
        results.failed.push(`${ebook.title}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    console.log(JSON.stringify({ success: true, results }));
    process.exit(0);
  } catch (error) {
    console.error('Script error:', error instanceof Error ? error.message : String(error));
    process.exit(2);
  }
})();
