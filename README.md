# The Alpha Network - Enterprise AI Solutions Platform

A full-stack B2B eCommerce and demo-driven website showcasing AI-powered enterprise products. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **Modern React Application** - Built with Vite for blazing-fast development
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for polished user experience
- **Product Catalog** - Dynamic product listings with detailed pages
- **Demo Request System** - Integrated lead capture forms
- **Contact Management** - Query submission and tracking
- **SEO Optimized** - Meta tags and semantic HTML

### Backend
- **RESTful API** - Clean, documented API endpoints
- **MongoDB Database** - Flexible schema for various product types
- **Email Notifications** - Automated confirmation emails
- **Rate Limiting** - Protection against abuse
- **Input Validation** - Express-validator for data integrity
- **Error Handling** - Comprehensive error management
- **Cloudinary Integration** - Ready for media asset management

## 📁 Project Structure

```
alpha-network/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js/Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   ├── seedData.js         # Database seed script
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Cloudinary** - Media management (configured)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alpha-network
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

5. Seed the database (optional):
```bash
node seedData.js
```

6. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🗄️ Database Models

### Product
- name, slug, category, tagline, description
- features, specifications, idealFor
- images, brochureUrl
- price, isActive, metadata

### DemoRequest
- fullName, email, phone, product
- companyName, message
- status (pending, contacted, scheduled, completed, cancelled)

### Query
- fullName, email, phone, query
- status (new, in-progress, resolved, closed)
- priority (low, medium, high)

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Demo Requests
- `POST /api/demo-requests` - Submit demo request
- `GET /api/demo-requests` - Get all requests (Admin)
- `PATCH /api/demo-requests/:id` - Update request status (Admin)

### Queries
- `POST /api/queries` - Submit contact query
- `GET /api/queries` - Get all queries (Admin)
- `PATCH /api/queries/:id` - Update query status (Admin)

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Vercel:
```bash
vercel deploy
```

Or Netlify:
```bash
netlify deploy --prod
```

### Backend (Railway/Render)

1. Push code to GitHub

2. Connect your repo to Railway or Render

3. Configure environment variables in the platform

4. Deploy!

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 🔐 Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting on forms
- Input validation and sanitization
- Environment variable management
- Error handling without exposing sensitive data

## 🎨 Customization

### Adding New Products

1. Use the seed script or API to add products
2. Upload images to Cloudinary
3. Update product slugs and details

### Styling

- Modify `tailwind.config.js` for theme colors
- Update components in `src/components/`
- Customize animations in page components

### Email Templates

- Edit templates in `backend/utils/emailService.js`
- Configure SMTP settings in `.env`

## 📝 Development Guidelines

### Code Style
- Use ES6+ features
- Follow React best practices
- Write semantic HTML
- Keep components modular and reusable

### Git Workflow
- Create feature branches
- Write descriptive commit messages
- Test before pushing

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string in `.env`
- Ensure network access in MongoDB Atlas

### Email Not Sending
- Verify SMTP credentials
- Enable "Less secure app access" for Gmail
- Use app-specific passwords

### CORS Errors
- Check FRONTEND_URL in backend `.env`
- Verify CORS configuration in `server.js`

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Developed by The Alpha Network Development Team

## 📞 Support

For support, email: support@thealphanetwork.in
