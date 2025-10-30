# The Alpha Network - Full Stack Prop Trading Platform

A complete prop trading platform with authentication, challenge management, and payout system.

## Project Structure

```
the-alpha-network/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── challengeController.js
│   │   │   └── payoutController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Challenge.js
│   │   │   └── Payout.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── challengeRoutes.js
│   │   │   └── payoutRoutes.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── emailService.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── PricingCard.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   └── FAQ.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Checkout.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---
# the-alpha-network
