# Nginx Configuration for academos.or.id

## ✅ Domain Activation Complete

Domain **academos.or.id** telah berhasil diaktifkan dengan konfigurasi:

### Server Details
- **Domain**: academos.or.id & www.academos.or.id
- **SSL**: Let's Encrypt (expires 2026-03-21)
- **Web Server**: Nginx with HTTP/2
- **Application**: Next.js via PM2 (port 3001)
- **Process Manager**: PM2 (auto-restart enabled)

### Configuration Files
```bash
# Nginx config
/etc/nginx/sites-available/academos.or.id
/etc/nginx/sites-enabled/academos.or.id -> symlink

# SSL certificates
/etc/letsencrypt/live/academos.or.id/fullchain.pem
/etc/letsencrypt/live/academos.or.id/privkey.pem
```

### Features Implemented
- ✅ HTTP to HTTPS redirect
- ✅ Let's Encrypt SSL (auto-renewal configured)
- ✅ Security headers (HSTS, X-Frame-Options, etc.)
- ✅ Reverse proxy to Next.js (localhost:3001)
- ✅ Static file caching (/_next/static)
- ✅ HTTP/2 enabled
- ✅ Matching existing domain configurations

### Access URLs
- **Main**: https://academos.or.id
- **WWW**: https://www.academos.or.id
- **HTTP**: Redirects to HTTPS automatically

## PM2 Management

### Common Commands
```bash
# View status
pm2 status

# View logs
pm2 logs academos

# Restart application
pm2 restart academos

# Stop application
pm2 stop academos

# Start application
pm2 start academos

# Monitor resources
pm2 monit
```

## Nginx Management

### Configuration Changes
```bash
# Edit config
nano /etc/nginx/sites-available/academos.or.id

# Test config
nginx -t

# Reload nginx (graceful)
systemctl reload nginx

# Restart nginx (hard)
systemctl restart nginx

# Check status
systemctl status nginx
```

### View Logs
```bash
# Nginx access log
tail -f /var/log/nginx/access.log

# Nginx error log
tail -f /var/log/nginx/error.log
```

## SSL Certificate Management

### Certificate Info
```bash
# List all certificates
certbot certificates

# Specific certificate
certbot certificates -d academos.or.id
```

### Manual Renewal (automatic renewal already configured)
```bash
# Renew all certificates
certbot renew

# Renew specific certificate
certbot renew --cert-name academos.or.id
```

### Auto-renewal Check
```bash
# Test renewal process
certbot renew --dry-run
```

## Troubleshooting

### If Site is Down
1. Check PM2 process:
   ```bash
   pm2 status
   pm2 logs academos --lines 100
   ```

2. Check Nginx:
   ```bash
   systemctl status nginx
   nginx -t
   ```

3. Check port 3001:
   ```bash
   netstat -tulpn | grep 3001
   curl http://localhost:3001
   ```

### If SSL Certificate Fails
```bash
# Check certificate expiry
certbot certificates

# Manual renewal
certbot renew --force-renewal -d academos.or.id
```

### Restart Everything
```bash
# Restart PM2 app
pm2 restart academos

# Reload Nginx
systemctl reload nginx
```

## Configuration Matching

Konfigurasi academos.or.id mengikuti pattern yang sama dengan domain existing:
- **bizmark.id**: PHP-FPM backend
- **api.bizmark.id**: API backend
- **academos.or.id**: Next.js reverse proxy (port 3001)

Semua domain menggunakan:
- Same SSL provider (Let's Encrypt)
- Same security headers
- Same nginx patterns
- Same auto-renewal setup

## Performance Optimization

### Static File Caching
Next.js static files (`/_next/static`) dikonfigurasi dengan:
- Cache-Control: public, immutable
- Proxy cache valid: 60m

### Security Headers
- Strict-Transport-Security: max-age=31536000
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Next Steps

✅ Domain sudah aktif dan dapat diakses
✅ SSL certificate sudah terpasang (valid 90 hari)
✅ Auto-renewal sudah dikonfigurasi
✅ PM2 akan auto-restart jika server reboot

Website sudah **production-ready** dan dapat diakses di:
**https://academos.or.id**
