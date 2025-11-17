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
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public_html')));

const MONGO = process.env.MONGO_URI || '';
if (!MONGO) {
  console.warn('MONGO_URI is not set in .env — please set it before running.');
}
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.warn('MongoDB connect warning:', err.message));

// API routes
app.use('/api', loginRoutes);
app.use('/api', requestRoutes);
app.use('/admin', adminRoutes);

// Serve login as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public_html', 'login', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// start export cron
exportRunner.start();
