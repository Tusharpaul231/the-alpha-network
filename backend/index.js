require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const loginRoutes = require('./routes/loginRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const exportRunner = require('./utils/exportExcel');

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(bodyParser.json());

// Serve all static files from public_html
app.use(express.static(path.join(__dirname, '..', 'public_html')));

// Serve login folder explicitly (optional, keeps /login URLs consistent)
app.use('/login', express.static(path.join(__dirname, '..', 'public_html', 'login')));

// === MONGODB CONNECTION ===
const MONGO = process.env.MONGO_URI || '';
if (!MONGO) {
  console.warn('MONGO_URI is not set in .env — please set it before running.');
}

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.warn('MongoDB connect warning:', err.message));

// === API ROUTES ===
app.use('/api', loginRoutes);
app.use('/api', requestRoutes);
app.use('/admin', adminRoutes);

// === DEFAULT ROUTES ===
// Serve login page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public_html', 'login', 'index.html'));
});

// Catch-all route for SPA / unknown paths (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public_html', 'login', 'index.html'));
});

// === START SERVER ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// === START EXPORT CRON ===
exportRunner.start();
