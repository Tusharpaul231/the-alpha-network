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

## Backend Files

### `backend/package.json`

```json
{
	"name": "the-alpha-network-backend",
	"version": "1.0.0",
	"description": "Backend API for The Alpha Network",
	"main": "src/server.js",
	"scripts": {
		"start": "node src/server.js",
		"dev": "nodemon src/server.js"
	},
	"dependencies": {
		"express": "^4.18.2",
		"mongoose": "^8.0.0",
		"bcryptjs": "^2.4.3",
		"jsonwebtoken": "^9.0.2",
		"dotenv": "^16.3.1",
		"cors": "^2.8.5",
		"express-validator": "^7.0.1",
		"nodemailer": "^6.9.7",
		"stripe": "^14.0.0"
	},
	"devDependencies": {
		"nodemon": "^3.0.1"
	}
}
```

### `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alphanetwork
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```
... (README continues — same content as provided earlier)

# the-alpha-network