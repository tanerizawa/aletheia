# Deployment Fix: Menghapus Standalone Mode

## Masalah Sebelumnya
- PM2 menggunakan standalone mode: `script: 'server.js', cwd: '/home/aletheia/.next/standalone'`
- File PDF baru harus di-copy manual ke `.next/standalone/public/`
- Tidak robust dan tidak proper

## Solusi
### 1. Update ecosystem.config.js
**Sebelum:**
```javascript
{
  script: 'server.js',
  cwd: '/home/aletheia/.next/standalone',
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3001'
  }
}
```

**Sesudah:**
```javascript
{
  script: 'npm',
  args: 'start',
  cwd: '/home/aletheia',
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://academos.or.id'
  }
}
```

### 2. Update next.config.ts
- Removed: `output: 'standalone'`
- Next.js sekarang serve files dari `/public/` secara otomatis

### 3. Update package.json
**Sebelum:** `"build": "next build && cp -r .next/static ... && cp -r public ..."`
**Sesudah:** `"build": "next build"`

## Hasil
✅ File PDF baru langsung accessible tanpa copy manual
✅ PM2 menggunakan `npm start` (Next.js default)
✅ Static files di `/public/` auto-served
✅ Sistem robust dan proper

## Testing
```bash
# Test PDF accessibility
curl -I "https://academos.or.id/ebooks/[filename].pdf"
# Should return HTTP/2 200

# Check PM2 configuration
pm2 info academos | grep -E "script|args|cwd"
# Should show: script='npm', args='start', cwd='/home/aletheia'
```

## Deployment Command
```bash
cd /home/aletheia
npm run build
pm2 restart academos
```

No more manual copy needed! 🎉
