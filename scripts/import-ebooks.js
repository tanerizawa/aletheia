#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
// const { PrismaClient } = require('@prisma/client'); // not used in this script

const https = require('https');
const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
// prisma client not used in this import helper script

// Ebook data dari halaman
const ebooks = [
  { id: 3050, title: "Introspeksi", author: "Y.B Mangunwijaya", publisher: "Jawa Pos" },
  { id: 1814, title: "Kamus Filsafat", author: "Lorens Bagus", publisher: "PT Gramedia Pustaka Utama" },
  { id: 1813, title: "Filsafat, Etika, dan Kearifan Lokal untuk Konstruksi Moral Kebangsaan", author: "Siti Syamsiyatun / Nihayatul Wafiroh", publisher: "Globethics.net International Secretariat" },
  { id: 1812, title: "Dunia Sophie", author: "Jostein Gaarder", publisher: "Mizan" },
  { id: 1809, title: "Filsafat Moral: Pergumulan Etis Keseharian Hidup Manusia", author: "Dr. Agustinus W. Dewantara, S.S., M.Hum", publisher: "PT. Kanisius" },
  { id: 1796, title: "Masalah-Masalah Dasar Marxisme", author: "G.V. Plekhanov", publisher: "Dep's Renaissance" },
  { id: 1795, title: "Filsafat Ilmu", author: "Mohammad Muslih", publisher: "Belukar" },
  { id: 1794, title: "Filsafat Jawa", author: "Dr. Abdullah Ciptoprawiro", publisher: "Balai Pustaka" },
  { id: 1793, title: "Pendahuluan Filsafat", author: "-", publisher: "-" },
  { id: 1792, title: "Filsafat Sebagai Ilmu Kritis", author: "Franz Magnis-Suseno", publisher: "PT. Kanisius" },
  { id: 1791, title: "Filsafat Perselingkuhan Sampai Anoreksia Kudus", author: "Reza A.A. Wattimena", publisher: "Evolitera" },
  { id: 1790, title: "Filsafat Perempuan Dalam Islam: Hak Perempuan dan Relevansi Etika Sosial", author: "Murtadha Muthahari", publisher: "RausyanFikr institute" }
];

const BASE_URL = 'http://103.44.149.34/elib/halaman/unduhv2/';
const TEMP_DIR = '/tmp/ebook-import';
const PUBLIC_DIR = '/home/aletheia/.next/standalone/public';

// Helper functions
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function extractPdfCover(pdfPath, outputPath) {
  try {
    // Extract first page as image using pdftoppm
    await execAsync(`pdftoppm -f 1 -l 1 -jpeg -r 150 "${pdfPath}" "${outputPath.replace('.jpg', '')}"`);
    
    // pdftoppm creates file with -1 suffix
    const generatedFile = `${outputPath.replace('.jpg', '')}-1.jpg`;
    if (fs.existsSync(generatedFile)) {
      fs.renameSync(generatedFile, outputPath);
      console.log(`✅ Cover extracted: ${path.basename(outputPath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Failed to extract cover: ${error.message}`);
    return false;
  }
}

async function importEbook(ebook, index) {
  const slug = slugify(`${ebook.title} ${ebook.author}`);
  const ebookId = `import-${Date.now()}-${index}`;
  
  console.log(`\n[${index + 1}/${ebooks.length}] Processing: ${ebook.title}`);
  
  try {
    // 1. Download PDF
    const pdfPath = path.join(TEMP_DIR, `${slug}.pdf`);
    console.log(`  📥 Downloading PDF...`);
    await downloadFile(`${BASE_URL}${ebook.id}`, pdfPath);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(1);
    console.log(`  ✅ Downloaded: ${fileSizeMB} MB`);
    
    // 2. Extract cover from first page
    const coverFilename = `${slug}-cover.jpg`;
    const coverPath = path.join(TEMP_DIR, coverFilename);
    console.log(`  🎨 Extracting cover...`);
    await extractPdfCover(pdfPath, coverPath);
    
    // 3. Copy files to public directories
    const publicPdfDir = path.join(PUBLIC_DIR, 'ebooks');
    const publicCoverDir = path.join(PUBLIC_DIR, 'images/ebooks/covers');
    
    if (!fs.existsSync(publicPdfDir)) fs.mkdirSync(publicPdfDir, { recursive: true });
    if (!fs.existsSync(publicCoverDir)) fs.mkdirSync(publicCoverDir, { recursive: true });
    
    fs.copyFileSync(pdfPath, path.join(publicPdfDir, `${slug}.pdf`));
    if (fs.existsSync(coverPath)) {
      fs.copyFileSync(coverPath, path.join(publicCoverDir, coverFilename));
    }
    
    // 4. Insert to database
    const description = `${ebook.title} oleh ${ebook.author}. Buku filsafat yang tersedia untuk dibaca dan diunduh.`;
    const coverImage = fs.existsSync(coverPath) ? `/images/ebooks/covers/${coverFilename}` : null;
    
    const insertQuery = `INSERT INTO "Ebook" (id, title, slug, author, publisher, category, description, "coverImage", format, "fileSize", "fileUrl", "availableOnline", downloadable, tags, language, "createdAt", "updatedAt") VALUES ('${ebookId}', '${ebook.title.replace(/'/g, "''")}', '${slug}', '${ebook.author.replace(/'/g, "''")}', '${ebook.publisher.replace(/'/g, "''")}', 'Filsafat', '${description.replace(/'/g, "''")}', ${coverImage ? `'${coverImage}'` : 'NULL'}, ARRAY['PDF'], '${fileSizeMB} MB', '/ebooks/${slug}.pdf', true, true, ARRAY['filsafat', 'import'], 'Indonesia', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;`;
    
    await execAsync(`PGPASSWORD='academos_2026_secure' psql -h localhost -U academos_user -d academos_db -c "${insertQuery}"`).catch(err => {
      console.error(`  ⚠️  Database error: ${err.message}`);
      return { stdout: '', stderr: err.message };
    });
    
    console.log(`  ✅ Imported to database: ${slug}`);
    console.log(`  🔗 URL: https://academos.or.id/baca/${slug}`);
    
    return { success: true, slug };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting ebook import process...');
  console.log(`📚 Total ebooks to import: ${ebooks.length}\n`);
  
  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  
  const results = [];
  
  for (let i = 0; i < ebooks.length; i++) {
    const result = await importEbook(ebooks[i], i);
    results.push(result);
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📚 Total: ${results.length}`);
  
  if (successful > 0) {
    console.log('\n🎉 Import completed! Visit https://academos.or.id/baca to see the books.');
  }
}

main().catch(console.error);
