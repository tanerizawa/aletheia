# Email Integration Guide

## Overview
Website Rumah Aletheia telah terintegrasi dengan **Resend** untuk mengirim email otomatis:

1. **Welcome Email** - Saat user subscribe newsletter
2. **Admin Notification** - Saat ada pesan masuk dari contact form  
3. **Auto-Reply** - Konfirmasi otomatis ke pengirim pesan

## Setup Resend

### 1. Buat Akun Resend
- Kunjungi: https://resend.com/signup
- Daftar dengan email/GitHub
- Free tier: 3,000 emails/bulan (cukup untuk startup)

### 2. Verifikasi Domain
```
Di Dashboard Resend > Domains > Add Domain
Domain: academos.or.id

Tambahkan DNS Records berikut di domain registrar:
- TXT record untuk verifikasi
- MX record untuk receiving
- SPF, DKIM records untuk deliverability
```

### 3. Generate API Key
```
Dashboard > API Keys > Create API Key
Name: Production
Permission: Full Access
```

### 4. Tambahkan ke Environment Variables

**Development (.env):**
```bash
RESEND_API_KEY=re_Vvci3956_8W6jocte5ra54AyM5PGPkcpA
EMAIL_FROM=noreply@academos.or.id
ADMIN_EMAIL=studiomalaka@gmail.com
```

**Production (PM2):**
```bash
# Edit ecosystem.config.js atau tambahkan langsung:
pm2 set academos:RESEND_API_KEY "re_Vvci3956_8W6jocte5ra54AyM5PGPkcpA"
pm2 set academos:EMAIL_FROM "noreply@academos.or.id"
pm2 set academos:ADMIN_EMAIL "studiomalaka@gmail.com"

# Restart aplikasi
pm2 restart academos --update-env
```

## Konfigurasi Email

### Newsletter Welcome Email
- **Template**: `/src/lib/email.ts` → `sendNewsletterWelcome()`
- **From**: noreply@academos.or.id
- **Subject**: ✅ Terima kasih telah berlangganan Newsletter Rumah Aletheia
- **Content**: HTML responsive dengan branding Aletheia

### Contact Form Notification
- **Template**: `/src/lib/email.ts` → `sendContactNotification()`
- **To**: Admin (studiomalaka@gmail.com)
- **Reply-To**: Email pengirim pesan
- **Subject**: 📩 Pesan Baru: {subject}
- **Content**: Detail lengkap pesan dengan link ke admin panel

### Contact Auto-Reply
- **Template**: `/src/lib/email.ts` → `sendContactAutoReply()`
- **To**: Email pengirim pesan
- **Subject**: Re: {subject}
- **Content**: Konfirmasi penerimaan pesan + info kontak

## Testing Email

### Test Newsletter Subscription
```bash
curl -X POST https://academos.or.id/api/public/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Expected: 
# - 201 Created response
# - Email terkirim ke test@example.com (cek inbox)
# - Subscriber tersimpan di database
```

### Test Contact Form
```bash
curl -X POST https://academos.or.id/api/public/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Testing Email",
    "message":"This is a test message"
  }'

# Expected:
# - 201 Created response
# - 2 emails terkirim:
#   1. Admin notification ke studiomalaka@gmail.com
#   2. Auto-reply ke test@example.com
# - Message tersimpan di database
```

## Monitoring

### Resend Dashboard
- Lihat email delivery logs
- Track open rates (jika diaktifkan)
- Bounce & complaint monitoring

### Console Logs
```bash
# Lihat logs PM2
pm2 logs academos --lines 100

# Cari email-related logs:
# ✅ Welcome email sent: <id>
# ✅ Admin notification sent: <id>
# ✅ Auto-reply sent: <id>
# ⚠️ RESEND_API_KEY not set, skipping email
```

## Troubleshooting

### Email tidak terkirim
1. **Cek API Key**: Pastikan `RESEND_API_KEY` terset di environment
   ```bash
   pm2 env academos | grep RESEND
   ```

2. **Cek Domain Verification**: Di Resend dashboard, domain harus status "Verified"

3. **Cek Logs**: 
   ```bash
   pm2 logs academos --err
   ```

### Email masuk spam
1. **SPF/DKIM**: Pastikan DNS records sudah benar
2. **Content**: Hindari kata-kata spam trigger
3. **Warm-up**: Kirim email secara bertahap (Resend auto warm-up)

### Rate Limiting
- Free tier: 3,000 emails/bulan, 100 emails/hari
- Jika melebihi, upgrade ke paid plan atau tunggu reset

## Customization

### Edit Template
File: `/src/lib/email.ts`

```typescript
// Ganti warna, logo, atau konten
html: `
  <div style="background: #YOUR_COLOR;">
    <img src="https://academos.or.id/logo.png" />
    ...
  </div>
`
```

### Tambah Email Baru
```typescript
export async function sendCustomEmail(data: any) {
  const client = getResendClient();
  if (!client) return { success: false };
  
  const { data: result, error } = await client.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Your Subject',
    html: '<p>Your HTML</p>',
  });
  
  return { success: !error, data: result };
}
```

## Best Practices

1. **Non-Blocking**: Email dikirim async (tidak block user response)
2. **Error Handling**: Gagal kirim email tidak crash aplikasi
3. **Logging**: Semua email activity tercatat di console
4. **Privacy**: Email subscriber tidak di-share
5. **Unsubscribe**: Tambahkan link unsubscribe (planned enhancement)

## Next Steps

1. ✅ Setup Resend account
2. ✅ Verify domain academos.or.id
3. ✅ Add API key to production environment
4. ⏳ Test all email flows
5. ⏳ Monitor deliverability
6. 🔄 (Optional) Add email templates designer
7. 🔄 (Optional) Add unsubscribe mechanism

## Resources

- **Resend Docs**: https://resend.com/docs
- **Email Templates**: https://github.com/resend/react-email
- **DNS Setup Guide**: https://resend.com/docs/send-with-domains

---

💡 **Note**: Email integration sudah di-deploy tapi akan skip sending jika `RESEND_API_KEY` belum diset. Aplikasi tetap berfungsi normal, hanya email yang tidak terkirim.
