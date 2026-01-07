# NGINX MIME Type Fix untuk academos.or.id

## Problem
Error MIME type di production:
- CSS files served sebagai 'text/plain' bukan 'text/css'
- JS files served sebagai 'text/plain' bukan 'application/javascript'
- WOFF2 fonts tidak ter-load dengan benar

## Solution

### 1. Backup Konfigurasi Lama
```bash
sudo cp /etc/nginx/sites-available/academos.or.id /etc/nginx/sites-available/academos.or.id.backup.$(date +%Y%m%d)
```

### 2. Update NGINX Configuration
```bash
# Copy file baru ke sites-available
sudo cp /home/aletheia/nginx-academos.conf /etc/nginx/sites-available/academos.or.id

# Test konfigurasi
sudo nginx -t
```

### 3. Reload NGINX
```bash
# Jika test berhasil, reload nginx
sudo systemctl reload nginx

# Atau restart untuk hard reload
sudo systemctl restart nginx
```

### 4. Verify
```bash
# Check nginx status
sudo systemctl status nginx

# Check logs untuk error
sudo tail -f /var/log/nginx/academos_error.log

# Check access logs
sudo tail -f /var/log/nginx/academos_access.log
```

### 5. Test MIME Types
```bash
# Test CSS file
curl -I https://academos.or.id/_next/static/chunks/7e6206ba4e457770.css
# Should return: Content-Type: text/css; charset=utf-8

# Test JS file
curl -I https://academos.or.id/_next/static/chunks/bea14a8efc966caa.js
# Should return: Content-Type: application/javascript; charset=utf-8
```

## Key Changes dalam Config Baru

### 1. Explicit MIME Type Configuration
```nginx
# Include default MIME types
include /etc/nginx/mime.types;

# Additional types for Next.js
types {
    application/javascript js mjs;
    text/css css;
    font/woff2 woff2;
    # ... etc
}
```

### 2. Force MIME Types untuk Next.js Assets
```nginx
# JavaScript chunks - forced MIME type
location ~* /_next/static/chunks/.*\.js$ {
    default_type application/javascript;
    add_header Content-Type "application/javascript; charset=utf-8" always;
}

# CSS files - forced MIME type
location ~* /_next/static/.*\.css$ {
    default_type text/css;
    add_header Content-Type "text/css; charset=utf-8" always;
}
```

### 3. Proper Caching Headers
- Static assets: `max-age=31536000, immutable` (1 year)
- Images: `max-age=86400` (1 day)
- HTML pages: `max-age=0, must-revalidate`
- API routes: `no-store, no-cache`

### 4. Security Headers Maintained
- HSTS dengan preload
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- CSP, Referrer-Policy, Permissions-Policy

### 5. Performance Optimizations
- HTTP/2 enabled
- Gzip compression
- Keepalive connections
- Rate limiting

## Troubleshooting

### Jika masih ada error 500:
```bash
# Check PM2 logs
pm2 logs academos

# Restart Next.js app
pm2 restart academos

# Check disk space
df -h

# Check memory
free -m
```

### Jika CSS/JS masih tidak load:
```bash
# Clear browser cache
# Hard reload: Ctrl+Shift+R (Chrome/Firefox)

# Check Next.js build
cd /home/aletheia
npm run build

# Restart PM2 process
pm2 restart academos
pm2 save
```

### Verify NGINX includes MIME types
```bash
# Check if mime.types exists
cat /etc/nginx/mime.types | grep "text/css"
cat /etc/nginx/mime.types | grep "application/javascript"
```

## Post-Fix Checklist

- [ ] NGINX configuration updated
- [ ] NGINX test passed (`nginx -t`)
- [ ] NGINX reloaded/restarted
- [ ] Browser hard reload (Ctrl+Shift+R)
- [ ] CSS files loading (check Network tab)
- [ ] JS files loading (check Network tab)
- [ ] Fonts loading correctly
- [ ] No console errors
- [ ] Pages rendering correctly
- [ ] Mobile responsive test

## Commands Reference

```bash
# Deploy & restart
cd /home/aletheia
git pull
npm install
npm run build
pm2 restart academos

# NGINX operations
sudo nginx -t                          # Test config
sudo systemctl reload nginx           # Graceful reload
sudo systemctl restart nginx          # Hard restart
sudo systemctl status nginx           # Check status

# Logs
sudo tail -f /var/log/nginx/academos_error.log
sudo tail -f /var/log/nginx/academos_access.log
pm2 logs academos

# PM2 operations
pm2 status                             # Check status
pm2 restart academos                   # Restart app
pm2 logs academos                      # View logs
pm2 monit                              # Monitor resources
```

## Expected Results

Setelah fix, semua requests harus mendapat MIME type yang benar:

| File Type | MIME Type | Status |
|-----------|-----------|--------|
| *.css | text/css; charset=utf-8 | ✅ |
| *.js | application/javascript; charset=utf-8 | ✅ |
| *.woff2 | font/woff2 | ✅ |
| *.woff | font/woff | ✅ |
| *.json | application/json | ✅ |
| *.svg | image/svg+xml | ✅ |
| *.html | text/html; charset=utf-8 | ✅ |

## Notes

- Config ini compatible dengan Next.js 16.1.0
- Optimized untuk static site generation (SSG)
- Includes security best practices
- Production-ready dengan rate limiting
- Auto-renewal SSL sudah dikonfigurasi sebelumnya
