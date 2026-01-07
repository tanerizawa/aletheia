# ✅ Production Checklist - Rumah Aletheia

## Pre-Deployment

### Content Updates
- [x] Update contact information di `src/app/kontak/page.tsx` ✅ (Karawang address)
- [x] Update email di `src/components/Footer.tsx` ✅ (studiomalaka@gmail.com)
- [x] Update domain di `src/app/sitemap.ts` ✅ (https://academos.or.id)
- [x] Update metadata di `src/app/layout.tsx` ✅
- [x] Review semua placeholder text and images ✅ (using emoji placeholders)
- [x] Update tahun copyright di Footer ✅ (2026)

### Technical Checks
- [x] Run `npm run build` - pastikan no errors ✅ (18 pages built successfully)
- [x] Run `npm start` - test production build locally ✅ (PM2 running on port 3001)
- [x] Test all pages: `/`, `/tentang`, `/kegiatan`, `/koleksi`, `/kontak` ✅ + 10 new pages
- [x] Test responsive design (mobile, tablet, desktop) ✅
- [ ] Test newsletter form submission ⚠️ (UI ready, backend needed)
- [x] Test FAQ accordion functionality ✅
- [x] Test book search and filter ✅ (FeaturedBooks component)
- [ ] Test contact form validation ⚠️ (UI ready, backend needed)
- [x] Check console for any JavaScript errors ✅ (only GA connection refused)

### SEO & Accessibility
- [x] Verify sitemap.xml accessible at `/sitemap.xml` ✅
- [x] Verify robots.txt accessible at `/robots.txt` ✅
- [x] Check all meta descriptions ✅ (18 pages with metadata)
- [ ] Run Lighthouse audit (Target: 90+ on all metrics) ⏳ TODO
- [x] Verify ARIA labels and keyboard navigation ✅
- [ ] Test with screen reader ⏳ TODO

### Security
- [ ] Security headers configured in `next.config.ts` ✅
- [ ] No API keys in source code
- [ ] Environment variables properly set
- [ ] Dependencies updated: `npm audit`

## Deployment Steps

### Option 1: Vercel (Recommended)
1. [ ] Push code to GitHub/GitLab
2. [ ] Connect repo to Vercel
3. [ ] Configure environment variables (if any)
4. [ ] Deploy to production
5. [ ] Add custom domain: academos.or.id
6. [ ] Update DNS records
7. [ ] Verify SSL certificate

### Option 2: VPS/Server ✅ ACTIVE DEPLOYMENT
1. [x] Server prepared (Node.js 20+, PM2, Nginx) ✅
2. [x] Clone repository to server ✅
3. [x] Run `npm install --production` ✅
4. [x] Run `npm run build` ✅ (18 pages)
5. [x] Configure PM2: `pm2 start npm --name academos -- start` ✅
6. [x] Configure Nginx reverse proxy ✅ (port 3001)
7. [x] Setup SSL with Let's Encrypt ✅ (https working)
8. [x] Configure firewall ✅
9. [ ] Setup monitoring ⏳ TODO

## Post-Deployment

### Verification
- [x] Visit https://academos.or.id - loads correctly ✅
- [x] Test all pages on production ✅ (18 pages verified HTTP 200)
- [ ] Test forms on production ⚠️ (UI ready, need backend integration)
- [x] Verify SSL certificate (https, green padlock) ✅
- [x] Check DNS propagation: `dig academos.or.id` ✅
- [x] Test from different locations/devices ✅
- [ ] Check Google Search Console indexing ⏳ TODO

### Monitoring Setup
- [ ] Setup Google Analytics (optional)
- [ ] Configure error monitoring (Sentry, etc)
- [ ] Setup uptime monitoring
- [ ] Configure backup strategy
- [ ] Setup automated backups

### Performance
- [ ] Run Lighthouse on production URL
- [ ] Check Core Web Vitals
- [ ] Verify all static assets loading
- [ ] Test page load speed from different locations

### Marketing & Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Share on social media (if applicable)
- [ ] Announce to stakeholders
- [ ] Update any printed materials with new URL

## Maintenance

### Regular Tasks
- [ ] Weekly: Check analytics and error logs
- [ ] Monthly: Update dependencies: `npm update`
- [ ] Monthly: Review and update content
- [ ] Quarterly: Security audit: `npm audit`
- [ ] Yearly: Review and optimize performance

### Emergency Contacts
- Domain Provider: __________
- Hosting Provider: __________
- Developer Contact: __________
- DNS Provider: __________

---

**Status**: ✅ DEPLOYED & LIVE 🚀  
**Last Updated**: January 5, 2026  
**Version**: 2.0.0 (18 pages deployed)
**Production URL**: https://academos.or.id
**PM2 Status**: Online (port 3001)
**Last Deploy**: January 5, 2026
