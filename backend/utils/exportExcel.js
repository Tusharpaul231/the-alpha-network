const cron = require('node-cron');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const LoginRecord = require('../models/LoginRecord');
const AccessRequest = require('../models/AccessRequest');

const EXPORT_DIR = path.join(__dirname, '..', 'exports');
if(!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR, { recursive: true });

async function runExport() {
  try {
    const logins = await LoginRecord.find().sort({ createdAt: -1 }).lean();
    const requests = await AccessRequest.find().sort({ createdAt: -1 }).lean();
    const wb = new ExcelJS.Workbook();
    const logSheet = wb.addWorksheet('Logins');
    const reqSheet = wb.addWorksheet('Requests');

    logSheet.columns = [
      { header: 'Name', key:'name', width:25 },
      { header: 'CountryCode', key:'countryCode', width:10 },
      { header: 'Mobile', key:'mobile', width:15 },
      { header: 'Email', key:'email', width:30 },
      { header: 'AlphaCode', key:'alphaCode', width:30 },
      { header: 'Accepted', key:'accepted', width:10 },
      { header: 'IP', key:'ip', width:20 },
      { header: 'CreatedAt', key:'createdAt', width:25 }
    ];
    logins.forEach(l=>logSheet.addRow({
      name:l.name,countryCode:l.countryCode,mobile:l.mobile,email:l.email,alphaCode:l.alphaCode,accepted:l.accepted,ip:l.ip,createdAt:l.createdAt
    }));

    reqSheet.columns = [
      { header:'Name', key:'name', width:25 },
      { header:'CountryCode', key:'countryCode', width:10 },
      { header:'Mobile', key:'mobile', width:15 },
      { header:'Email', key:'email', width:30 },
      { header:'Approved', key:'approved', width:10 },
      { header:'CreatedAt', key:'createdAt', width:25 }
    ];
    requests.forEach(r=>reqSheet.addRow({ name:r.name,countryCode:r.countryCode,mobile:r.mobile,email:r.email,approved:r.approved,createdAt:r.createdAt }));

    const filename = `alpha_users_${new Date().toISOString().slice(0,10)}.xlsx`;
    const outPath = path.join(EXPORT_DIR, filename);
    await wb.xlsx.writeFile(outPath);
    console.log('Exported to', outPath);
  } catch(err){
    console.error('Export failed', err);
  }
}

function start() {
  const schedule = process.env.CRON_SCHEDULE || '30 18 * * *';
  cron.schedule(schedule, () => {
    console.log('Running scheduled export at', new Date().toISOString());
    runExport();
  }, { timezone: process.env.EXPORT_TZ || 'UTC' });
  if (process.env.RUN_EXPORT_ON_START === 'true') runExport();
}

module.exports = { start, runExport };
