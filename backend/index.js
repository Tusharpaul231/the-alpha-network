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

// =========================
//       FIXED CORS
// =========================
app.use(cors({
  origin: [
    "https://the-alpha-network.onrender.com",
    "https://thealphanetwork.in",
    "https://www.thealphanetwork.in",
    "http://localhost:3000",
    "http://localhost:4000"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(bodyParser.json());

// =========================
//  STATIC FILES FIXED
// =========================
app.use('/login', express.static(path.join(__dirname, '..', 'public_html', 'login')));
app.use(express.static(path.join(__dirname, '..', 'public_html')));

// =========================
//  DATABASE CONNECTION
// =========================
const MONGO = process.env.MONGO_URI;
if (!MONGO) console.warn("⚠ MONGO_URI missing in .env");

mongoose.connect(MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo Error:", err));

// =========================
//      API ROUTES
// =========================
app.use('/api', loginRoutes);
app.use('/api', requestRoutes);
app.use('/admin', adminRoutes);

// =========================
//      FRONTEND ROUTE
// =========================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public_html', 'login', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// start cron
exportRunner.start();
