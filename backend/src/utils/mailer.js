const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || '"Nexorith Studio" <noreply@nexorith.tech>';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "https://nexorith.tech";

function createTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP not configured — emails will be skipped.");
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for port 465 (SSL), false for 587
    requireTLS: SMTP_PORT === 587, // force STARTTLS on port 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      rejectUnauthorized: false, // avoids cert issues on some servers
    },
  });
}

const baseStyle = `
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #030306;
  color: #f4f4f8;
  margin: 0; padding: 0;
`;

function wrapEmail(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nexorith Studio</title></head>
<body style="${baseStyle}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030306;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#0a0a10;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,rgba(34,211,238,0.12),rgba(139,92,246,0.12));padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;color:rgba(103,232,249,0.8);">Nexorith Studio</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2);">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);text-align:center;">
              © ${new Date().getFullYear()} Nexorith Studio · Remote-first studio · <a href="${FRONTEND_ORIGIN}" style="color:rgba(103,232,249,0.6);text-decoration:none;">nexorith.tech</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Send inquiry confirmation email to a new lead.
 */
async function sendInquiryConfirmation({ name, email, trackingId, projectType }) {
  const transport = createTransport();
  if (!transport) return;

  const statusUrl = `${FRONTEND_ORIGIN}/status`;
  const html = wrapEmail(`
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#fff;">We received your inquiry</h1>
    <p style="margin:0 0 28px;color:rgba(255,255,255,0.5);font-size:15px;line-height:1.6;">
      Hi ${name}, thank you for reaching out about <strong style="color:rgba(255,255,255,0.8);">${projectType}</strong>. 
      Our team will review your request and get back to you within one business day.
    </p>

    <!-- Tracking ID Card -->
    <div style="background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.2);border-radius:16px;padding:24px;margin-bottom:28px;text-align:center;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;color:rgba(103,232,249,0.7);">Your Project Tracking ID</p>
      <p style="margin:0;font-family:monospace;font-size:26px;font-weight:700;color:#67e8f9;letter-spacing:0.1em;">${trackingId}</p>
    </div>

    <p style="margin:0 0 20px;color:rgba(255,255,255,0.45);font-size:13px;line-height:1.6;">
      Save this ID. You can use it anytime to check your project&apos;s status, milestones, and updates from our team.
    </p>

    <!-- CTA Button -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${statusUrl}" style="display:inline-block;background:linear-gradient(135deg,#67e8f9,#a78bfa);color:#0a0a10;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:100px;">
        Track Your Project
      </a>
    </div>

    <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
      Questions? Reply to this email or reach us at <a href="mailto:partnerships@nexorith.io" style="color:rgba(103,232,249,0.6);text-decoration:none;">partnerships@nexorith.io</a>
    </p>
  `);

  await transport.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: `[Nexorith] Your inquiry received — Tracking ID: ${trackingId}`,
    html,
  });
  console.log(`[mailer] Confirmation sent to ${email} (${trackingId})`);
}

/**
 * Send status update notification to a lead.
 */
async function sendStatusUpdate({ name, email, trackingId, projectStatus, projectUpdate }) {
  const transport = createTransport();
  if (!transport) return;

  const statusUrl = `${FRONTEND_ORIGIN}/status`;
  const html = wrapEmail(`
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#fff;">Project status updated</h1>
    <p style="margin:0 0 28px;color:rgba(255,255,255,0.5);font-size:15px;line-height:1.6;">
      Hi ${name}, there&apos;s a new update on your project with Nexorith Studio.
    </p>

    <!-- Status Card -->
    <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.2);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;color:rgba(167,139,250,0.7);">New Status</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:#a78bfa;">${projectStatus}</p>
    </div>

    <!-- Update Message -->
    ${projectUpdate ? `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Update from the team</p>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;">${projectUpdate}</p>
    </div>
    ` : ""}

    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.3);">Your tracking ID:</p>
    <p style="margin:0 0 24px;font-family:monospace;font-size:16px;color:#67e8f9;font-weight:700;">${trackingId}</p>

    <!-- CTA Button -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${statusUrl}" style="display:inline-block;background:linear-gradient(135deg,#67e8f9,#a78bfa);color:#0a0a10;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:100px;">
        View Full Status
      </a>
    </div>

    <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
      Questions? Reply to this email or reach us at <a href="mailto:partnerships@nexorith.io" style="color:rgba(103,232,249,0.6);text-decoration:none;">partnerships@nexorith.io</a>
    </p>
  `);

  await transport.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: `[Nexorith] Project update: ${projectStatus} — ${trackingId}`,
    html,
  });
  console.log(`[mailer] Status update sent to ${email} (${trackingId}): ${projectStatus}`);
}

module.exports = { sendInquiryConfirmation, sendStatusUpdate };
