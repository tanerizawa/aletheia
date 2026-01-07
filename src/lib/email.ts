import { Resend } from 'resend';

// Initialize Resend with API key from environment (lazy initialization)
let resend: Resend | null = null;

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@academos.or.id';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'studiomalaka@gmail.com';

/**
 * Send newsletter subscription confirmation email
 */
export async function sendNewsletterWelcome(email: string) {
  try {
    const client = getResendClient();
    if (!client) {
      console.log('⚠️ RESEND_API_KEY not set, skipping email');
      return { success: false, error: 'Email not configured' };
    }

    const { data, error } = await client.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '✅ Terima kasih telah berlangganan Newsletter Rumah Aletheia',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2C5F5D 0%, #3A7A77 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #B05E3F; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            h1 { margin: 0; font-size: 24px; }
            .highlight { background: #FFF9E6; padding: 15px; border-left: 4px solid #B05E3F; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Selamat Datang!</h1>
            </div>
            <div class="content">
              <p>Halo,</p>
              
              <p><strong>Terima kasih telah berlangganan newsletter Rumah Aletheia!</strong></p>
              
              <p>Anda sekarang akan menerima update terbaru tentang:</p>
              <ul>
                <li>📚 Koleksi buku dan e-book terbaru</li>
                <li>📝 Artikel dan kajian terkini</li>
                <li>🎯 Program dan kegiatan perpustakaan</li>
                <li>🎓 Informasi penelitian sosial</li>
                <li>📖 Penerbitan independen</li>
              </ul>
              
              <div class="highlight">
                <strong>💡 Tips:</strong> Tambahkan email kami ke kontak Anda agar newsletter tidak masuk ke spam.
              </div>
              
              <div style="text-align: center;">
                <a href="https://academos.or.id" class="button">Kunjungi Website</a>
              </div>
              
              <p style="margin-top: 30px;">Salam literasi,<br><strong>Tim Rumah Aletheia</strong></p>
            </div>
            <div class="footer">
              <p><strong>Rumah Aletheia</strong><br>
              Jalan Patinggi, Desa Cibadak, Rawamerta, Karawang 41382<br>
              📧 ${ADMIN_EMAIL} | 🌐 <a href="https://academos.or.id">academos.or.id</a></p>
              <p style="margin-top: 10px; font-size: 11px; color: #999;">
                Anda menerima email ini karena telah berlangganan newsletter kami.<br>
                Untuk berhenti berlangganan, hubungi kami.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      return { success: false, error };
    }

    console.log('✅ Welcome email sent:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Email exception:', error);
    return { success: false, error };
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const client = getResendClient();
    if (!client) {
      console.log('⚠️ RESEND_API_KEY not set, skipping email');
      return { success: false, error: 'Email not configured' };
    }

    const { data: emailData, error } = await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `📩 Pesan Baru: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: monospace; line-height: 1.6; color: #333; background: #f5f5f5; padding: 20px; }
            .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: #B05E3F; color: white; padding: 20px; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .value { background: #f9f9f9; padding: 12px; border-left: 3px solid #2C5F5D; margin-top: 5px; }
            .message-box { background: #FFF9E6; padding: 20px; border: 1px solid #B05E3F; border-radius: 5px; white-space: pre-wrap; }
            .action-button { display: inline-block; padding: 10px 25px; background: #2C5F5D; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📬 Pesan Baru dari Website</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Rumah Aletheia - academos.or.id</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Dari:</div>
                <div class="value"><strong>${data.name}</strong> &lt;${data.email}&gt;</div>
              </div>
              
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Pesan:</div>
                <div class="message-box">${data.message}</div>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #666; font-size: 14px;">
                💡 <strong>Tip:</strong> Klik tombol di bawah untuk membalas via admin panel,<br>
                atau langsung reply email ini untuk membalas ke <code>${data.email}</code>
              </p>
              
              <div style="text-align: center;">
                <a href="https://academos.or.id/admin/messages" class="action-button">
                  Buka Admin Panel
                </a>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #999;">
                Email dikirim otomatis dari sistem contact form.<br>
                Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Admin notification error:', error);
      return { success: false, error };
    }

    console.log('✅ Admin notification sent:', emailData?.id);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('❌ Email exception:', error);
    return { success: false, error };
  }
}

/**
 * Send auto-reply to contact form submitter
 */
export async function sendContactAutoReply(data: {
  name: string;
  email: string;
  subject: string;
}) {
  try {
    const client = getResendClient();
    if (!client) {
      console.log('⚠️ RESEND_API_KEY not set, skipping email');
      return { success: false, error: 'Email not configured' };
    }

    const { data: emailData, error } = await client.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Re: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3A7A77 0%, #2C5F5D 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .info-box { background: #E8F4F8; padding: 15px; border-left: 4px solid #2C5F5D; margin: 20px 0; }
            h1 { margin: 0; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Pesan Anda Telah Diterima</h1>
            </div>
            <div class="content">
              <p>Halo <strong>${data.name}</strong>,</p>
              
              <p>Terima kasih telah menghubungi <strong>Rumah Aletheia</strong>.</p>
              
              <div class="info-box">
                <p style="margin: 0;"><strong>📝 Pesan Anda:</strong> "${data.subject}"</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                  Status: <span style="color: #28a745; font-weight: bold;">✓ Telah diterima</span>
                </p>
              </div>
              
              <p>Pesan Anda sudah kami terima dan akan segera ditinjau oleh tim kami. Kami akan merespons dalam <strong>1-2 hari kerja</strong>.</p>
              
              <p><strong>Informasi Kontak:</strong></p>
              <ul style="line-height: 1.8;">
                <li>📍 Jalan Patinggi, Desa Cibadak, Rawamerta, Karawang 41382</li>
                <li>📞 081382605030</li>
                <li>📧 ${ADMIN_EMAIL}</li>
                <li>🌐 <a href="https://academos.or.id" style="color: #2C5F5D;">academos.or.id</a></li>
              </ul>
              
              <p style="margin-top: 30px;">Salam hangat,<br><strong>Tim Rumah Aletheia</strong><br>PT Academos Pustaka Demokrasi</p>
            </div>
            <div class="footer">
              <p>Email ini dikirim otomatis. Mohon tidak membalas email ini.<br>
              Untuk pertanyaan lebih lanjut, silakan kirim email baru ke ${ADMIN_EMAIL}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Auto-reply error:', error);
      return { success: false, error };
    }

    console.log('✅ Auto-reply sent:', emailData?.id);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('❌ Email exception:', error);
    return { success: false, error };
  }
}
