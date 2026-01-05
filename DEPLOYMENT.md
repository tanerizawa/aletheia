# 🚀 Panduan Deployment Production

## Pilihan Deployment

Website Rumah Aletheia dapat di-deploy menggunakan berbagai platform. Berikut adalah pilihan yang direkomendasikan:

---

## 📦 Option 1: Vercel (Recommended)

Vercel adalah platform deployment yang dibuat oleh creator Next.js, memberikan performance terbaik dan setup yang paling mudah.

### Langkah-langkah:

1. **Push ke Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Rumah Aletheia website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Sign up / Login dengan GitHub account Anda
   - Click "Add New Project"
   - Import repository Anda
   - Vercel akan auto-detect Next.js dan configure build settings
   - Click "Deploy"

3. **Custom Domain Setup (academos.or.id)**
   - Di Vercel dashboard, pilih project Anda
   - Go to "Settings" → "Domains"
   - Add domain: `academos.or.id`
   - Ikuti instruksi untuk update DNS records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Tunggu DNS propagation (1-48 jam)

4. **Environment Variables (Optional)**
   - Settings → Environment Variables
   - Add variables jika ada API keys atau secrets

### Build Settings di Vercel:
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

## 🌐 Option 2: VPS/Dedicated Server (Manual)

Untuk kontrol penuh dan hosting di server sendiri.

### Persiapan Server:

1. **Install Node.js & npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone & Build Project**
   ```bash
   cd /var/www
   git clone <your-repo-url> aletheia
   cd aletheia
   npm install
   npm run build
   ```

4. **Start dengan PM2**
   ```bash
   pm2 start npm --name "aletheia" -- start
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx Reverse Proxy**
   
   Create file: `/etc/nginx/sites-available/academos.or.id`
   ```nginx
   server {
       listen 80;
       server_name academos.or.id www.academos.or.id;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/academos.or.id /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Setup SSL dengan Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d academos.or.id -d www.academos.or.id
   ```

---

## 🐳 Option 3: Docker Deployment

### Dockerfile
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build & Run:
```bash
docker build -t aletheia-web .
docker run -p 3000:3000 aletheia-web
```

---

## ⚙️ Environment Configuration

Create `.env.production` (if needed):
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://academos.or.id
NEXT_PUBLIC_SITE_NAME=Rumah Aletheia

# Analytics (Optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form API (if implemented)
# CONTACT_FORM_API_URL=https://api.example.com/contact
```

---

## 📋 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build && npm start`
- [ ] Update contact information dengan data real
- [ ] Replace placeholder images (if any)
- [ ] Configure custom domain DNS
- [ ] Setup SSL certificate
- [ ] Test website di berbagai devices
- [ ] Setup analytics (Google Analytics, etc)
- [ ] Setup error monitoring (Sentry, etc)
- [ ] Configure backup strategy
- [ ] Test form submissions
- [ ] Verify SEO metadata
- [ ] Check accessibility dengan Lighthouse
- [ ] Setup 404 error page
- [ ] Configure robots.txt untuk production domain

---

## 🔒 Security Recommendations

1. **SSL/TLS**: Always use HTTPS
2. **Security Headers**: Configure in `next.config.ts`
   ```typescript
   async headers() {
     return [
       {
         source: '/:path*',
         headers: [
           {
             key: 'X-DNS-Prefetch-Control',
             value: 'on'
           },
           {
             key: 'X-Frame-Options',
             value: 'SAMEORIGIN'
           },
           {
             key: 'X-Content-Type-Options',
             value: 'nosniff'
           }
         ]
       }
     ]
   }
   ```
3. **Rate Limiting**: Implement untuk form submissions
4. **Content Security Policy**: Add CSP headers
5. **Regular Updates**: Keep dependencies updated

---

## 📊 Monitoring & Analytics

### Google Analytics Setup:
1. Create GA4 property
2. Add tracking ID to `.env.production`
3. Install analytics package:
   ```bash
   npm install @next/third-parties
   ```

### Performance Monitoring:
- Use Vercel Analytics (free dengan Vercel)
- Or setup custom monitoring dengan Sentry
- Monitor Core Web Vitals

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test # if you have tests
```

---

## 📞 Support & Maintenance

**Post-Deployment Tasks:**
- Monitor error logs regularly
- Setup automated backups
- Keep dependencies updated
- Monitor website performance
- Respond to user feedback
- Regular content updates

**Troubleshooting:**
- Check build logs untuk errors
- Verify DNS propagation: `dig academos.or.id`
- Test SSL: `openssl s_client -connect academos.or.id:443`
- Check server logs: `pm2 logs aletheia`

---

## 🎯 Quick Deploy Commands

```bash
# Local testing
npm run build
npm start

# Production build check
npm run build && npm start

# Deploy to Vercel (with CLI)
npm i -g vercel
vercel --prod

# Docker quick deploy
docker-compose up -d
```

---

**Website siap untuk production! 🚀**

Untuk bantuan deployment, hubungi tim development atau konsultasikan dengan hosting provider Anda.
