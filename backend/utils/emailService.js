const nodemailer = require('nodemailer');
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT||'587',10),
    secure: (process.env.SMTP_SECURE === 'true'),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  transporter.verify((err, success) => {
    if (err) console.error('SMTP ERROR:', err);
    else console.log('SMTP CONNECTED SUCCESSFULLY');
  });
} else {
  console.warn('SMTP not configured. Emails will not be sent until you configure SMTP_* in .env');
}

async function sendSimpleEmail(to, subject, text) {
  if(!transporter) return Promise.resolve();
  const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.SMTP_USER;
  return transporter.sendMail({ from, to, subject, text }).catch(err => console.error('Email send failed:', err));
}

module.exports = { sendSimpleEmail };
