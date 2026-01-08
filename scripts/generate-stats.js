const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function main() {
  const env = fs.existsSync(path.join(__dirname, '..', '.env')) ? fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8') : process.env;
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString && typeof env === 'string') {
    const m = env.match(/DATABASE_URL="?(.*)"?/);
    connectionString = m ? m[1] : undefined;
  }

  if (!connectionString) {
    console.error('DATABASE_URL not found in environment or .env');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  try {
    const resEbook = await pool.query('SELECT COUNT(*)::int AS count FROM \"Ebook\"');
    const resArticle = await pool.query('SELECT COUNT(*)::int AS count FROM \"Article\" WHERE published = true');
    const resEvent = await pool.query('SELECT COUNT(*)::int AS count FROM \"Event\"');

    const data = {
      ebooks: { total: resEbook.rows[0].count },
      articles: { published: resArticle.rows[0].count },
      events: { total: resEvent.rows[0].count },
      organization: { established: 2025 }
    };

    const outPath = path.join(__dirname, '..', 'public', 'stats.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log('Wrote', outPath);
  } catch (e) {
    console.error('Failed to generate stats:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
