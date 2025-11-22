const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const LoginRecord = require('../models/LoginRecord');
const AlphaCode = require('../models/AlphaCode');

// simple in-memory captcha store
const captchaStore = new Map();
function generateCaptchaText(len=5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s=''; for(let i=0;i<len;i++) s+=chars[Math.floor(Math.random()*chars.length)];
  return s;
}
function createCaptcha() {
  const id = uuidv4();
  const text = generateCaptchaText(5);
  const expiresAt = Date.now() + 5*60*1000;
  captchaStore.set(id, { text, expiresAt });
  setTimeout(()=>captchaStore.delete(id), 5*60*1000+2000);
  return { id, text };
}
function textToSVGData(text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48"><rect width="100%" height="100%" fill="transparent"/>` +
    `<text x="10" y="32" font-family="Verdana" font-size="26" fill="white" font-weight="700">${text}</text></svg>`;
  return 'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64');
}

router.get('/captcha', (req,res)=>{
  const c = createCaptcha();
  res.json({ id: c.id, svgData: textToSVGData(c.text), expiresInSeconds: 300 });
});

router.post('/login', async (req,res)=>{
  try {
    const { name, countryCode, mobile, email, city, alphaCode, captchaId, captchaAnswer } = req.body;
    if(!name||!countryCode||!mobile||!email||!city||!alphaCode||!captchaId||!captchaAnswer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const cap = captchaStore.get(captchaId);
    if(!cap || cap.expiresAt < Date.now()) return res.status(400).json({ error: 'Captcha expired' });
    if(cap.text.toLowerCase() !== String(captchaAnswer).trim().toLowerCase()) return res.status(400).json({ error: 'Captcha invalid' });

    const a = await AlphaCode.findOne({ alphaCode: alphaCode });
    let accepted = false;
    if (a) {
      if (a.used && a.singleUse) {
        accepted = false;
      } else if (a.expiresAt && a.expiresAt < Date.now()) {
        accepted = false;
      } else {
        accepted = true;
        if (a.singleUse) {
          a.used = true;
          a.usedAt = new Date();
          await a.save();
        }
      }
    }

    const record = new LoginRecord({ name, countryCode, mobile, email, city, alphaCode, captchaId, ip: req.ip, accepted });
    await record.save();
    captchaStore.delete(captchaId);
    res.json({ success: true, alphaAccepted: accepted, message: accepted ? 'Alpha code accepted' : 'Alpha code invalid/pending' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
