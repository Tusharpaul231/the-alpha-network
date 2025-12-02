require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const loginRoutes = require('./routes/loginRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/BookingRoutes');
const exportRunner = require('./utils/exportExcel');

const app = express();

// =========================
//       FIXED CORS
// =========================
app.use(cors({
  origin: [
    "https://thealphanetwork.in",
    "https://www.thealphanetwork.in",
    "https://the-alpha-network-production.up.railway.app",   // Railway FRONTEND
    "https://the-alpha-network-backend-production.up.railway.app", // Railway BACKEND (optional)
    "http://localhost:3000",
    "http://localhost:4000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

mongoose.connect(MONGO, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo Error:", err));

// =========================
//      API ROUTES
// =========================
app.use('/api', loginRoutes);
app.use('/api', requestRoutes);
app.use('/api', bookingRoutes);
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
