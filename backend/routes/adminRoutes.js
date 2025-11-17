const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const RequestPass = require('../models/AccessRequest');
const AlphaCode = require('../models/AlphaCode');
const LoginRecord = require('../models/LoginRecord');
const { v4: uuidv4 } = require('uuid');
const emailService = require('../utils/emailService');

function ensureAdminJWT(req,res,next){
  const auth = req.headers.authorization;
  if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try{
    const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET || 'change_this_secret');
    req.admin = payload;
    next();
  } catch(err){
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// admin login
router.post('/login', async (req,res)=>{
  try {
    const { email, password } = req.body;
    if(!email||!password) return res.status(400).json({ error: 'Missing' });
    const admin = await AdminUser.findOne({ email });
    if(!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, process.env.ADMIN_JWT_SECRET || 'change_this_secret', { expiresIn: '8h' });
    res.json({ token });
  } catch(err){
    console.error(err); res.status(500).json({ error:'Server error' });
  }
});

// list requests
router.get('/requests', ensureAdminJWT, async (req,res)=>{
  const list = await RequestPass.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

// list logins
router.get('/logins', ensureAdminJWT, async (req,res)=>{
  const list = await LoginRecord.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

// approve request -> create alpha code and email user
router.post('/approve-request/:id', ensureAdminJWT, async (req,res)=>{
  try {
    const id = req.params.id;
    const request = await RequestPass.findById(id);
    if(!request) return res.status(404).json({ error: 'Not found' });
    if(request.approved) return res.status(400).json({ error: 'Already approved' });

    const code = `alpha@${uuidv4().slice(0,8)}`;
    const alpha = new AlphaCode({
      code, singleUse:true, issuedToEmail: request.email, issuedToMobile: `${request.countryCode}${request.mobile}`, issuedBy: req.admin.email
    });
    await alpha.save();

    request.approved = true; request.approvedBy = req.admin.email; request.alphaCodeId = alpha._id; await request.save();

    if (process.env.SMTP_HOST) {
      const mail = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: request.email,
        subject: 'Your Alpha Access Code - The Alpha Network',
        text: `Hi ${request.name},\n\nYour access request has been approved. Your alpha access code is:\n\n${code}\n\nRegards,\nThe Alpha Network`
      };
      emailService.sendSimpleEmail(mail.to, mail.subject, mail.text);
    }

    res.json({ success:true, code });
  } catch(err){ console.error(err); res.status(500).json({ error:'Server error' }); }
});

// generate ad-hoc code
router.post('/generate-code', ensureAdminJWT, async (req,res)=>{
  try {
    const { singleUse=true, issuedToEmail=null, issuedToMobile=null, expiresInDays=null, note=null } = req.body;
    const code = `alpha@${uuidv4().slice(0,8)}`;
    const alpha = new AlphaCode({ code, singleUse, issuedToEmail, issuedToMobile, issuedBy: req.admin.email, expiresAt: expiresInDays ? new Date(Date.now()+expiresInDays*24*3600*1000) : null, note });
    await alpha.save();
    if(process.env.SMTP_HOST && issuedToEmail) {
      emailService.sendSimpleEmail(issuedToEmail, 'Your Alpha Access Code', `Your code: ${code}`);
    }
    res.json({ success:true, code });
  } catch(err){ console.error(err); res.status(500).json({ error:'Server error' }); }
});

// export excel
router.get('/export', ensureAdminJWT, async (req,res)=>{
  try {
    const logins = await LoginRecord.find().sort({ createdAt: -1 }).lean();
    const requests = await RequestPass.find().sort({ createdAt: -1 }).lean();
    const codes = await AlphaCode.find().sort({ issuedAt: -1 }).lean();

    const ExcelJS = require('exceljs');
    const wb = new ExcelJS.Workbook();
    const ls = wb.addWorksheet('Logins');
    const rs = wb.addWorksheet('Requests');
    const cs = wb.addWorksheet('AlphaCodes');

    ls.columns = [{header:'Name',key:'name',width:25},{header:'CountryCode',key:'countryCode',width:10},{header:'Mobile',key:'mobile',width:15},{header:'Email',key:'email',width:30},{header:'AlphaCode',key:'alphaCode',width:30},{header:'Accepted',key:'accepted',width:10},{header:'IP',key:'ip',width:20},{header:'CreatedAt',key:'createdAt',width:25}];
    logins.forEach(l=>ls.addRow({name:l.name,countryCode:l.countryCode,mobile:l.mobile,email:l.email,alphaCode:l.alphaCode,accepted:l.accepted,ip:l.ip,createdAt:l.createdAt}));

    rs.columns = [{header:'Name',key:'name',width:25},{header:'CountryCode',key:'countryCode',width:10},{header:'Mobile',key:'mobile',width:15},{header:'Email',key:'email',width:30},{header:'Approved',key:'approved',width:10},{header:'AlphaCodeId',key:'alphaCodeId',width:40},{header:'CreatedAt',key:'createdAt',width:25}];
    requests.forEach(r=>rs.addRow({name:r.name,countryCode:r.countryCode,mobile:r.mobile,email:r.email,approved:r.approved,alphaCodeId:r.alphaCodeId?String(r.alphaCodeId):'',createdAt:r.createdAt}));

    cs.columns = [{header:'Code',key:'code',width:30},{header:'SingleUse',key:'singleUse',width:10},{header:'IssuedToEmail',key:'issuedToEmail',width:30},{header:'IssuedToMobile',key:'issuedToMobile',width:20},{header:'Used',key:'used',width:10},{header:'IssuedAt',key:'issuedAt',width:25},{header:'UsedAt',key:'usedAt',width:25},{header:'ExpiresAt',key:'expiresAt',width:25},{header:'IssuedBy',key:'issuedBy',width:20},{header:'Note',key:'note',width:30}];
    codes.forEach(c=>cs.addRow({code:c.code,singleUse:c.singleUse,issuedToEmail:c.issuedToEmail,issuedToMobile:c.issuedToMobile,used:c.used,issuedAt:c.issuedAt,usedAt:c.usedAt,expiresAt:c.expiresAt,issuedBy:c.issuedBy,note:c.note}));

    res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition','attachment; filename="alpha_export.xlsx"');
    await wb.xlsx.write(res);
    res.end();
  } catch(err){ console.error(err); res.status(500).json({ error:'Server error' }); }
});

module.exports = router;
