# Deployment Guide - The Alpha Network

This guide covers deployment options for The Alpha Network platform.

## 🚀 Quick Deploy Options

### Option 1: Docker Compose (Recommended for Development)

```bash
# 1. Clone the repository
git clone <repository-url>
cd alpha-network

# 2. Create .env file in root
cp backend/.env.example .env
# Edit .env with your credentials

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Option 2: Separate Deployments (Recommended for Production)

## 📦 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Configure Build Settings**
```bash
cd frontend
```

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

3. **Deploy**
```bash
vercel deploy --prod
```

4. **Environment Variables** (in Vercel dashboard)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Create `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. **Deploy**
```bash
netlify deploy --prod
```

## 🖥️ Backend Deployment

### Railway (Recommended)

1. **Sign up at railway.app**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure Service**
   - Root directory: `backend`
   - Start command: `node server.js`

4. **Add Environment Variables**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-frontend-url.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Deploy**
   - Railway will auto-deploy on git push

### Render

1. **Sign up at render.com**

2. **Create New Web Service**
   - Connect GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`

3. **Configure Environment Variables** (same as Railway)

4. **Deploy**
   - Render will auto-deploy

### Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create alpha-network-api
```

3. **Add Procfile** (in backend folder)
```
web: node server.js
```

4. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
# ... set all other env vars
```

5. **Deploy**
```bash
git subtree push --prefix backend heroku main
```

## 🗄️ Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Choose cloud provider (AWS/GCP/Azure)
   - Select region (closest to your users)
   - Choose free tier (M0)

3. **Configure Access**
   - Database Access: Create user with password
   - Network Access: Add IP (0.0.0.0/0 for development)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Seed Database** (optional)
```bash
# Update MONGODB_URI in .env
cd backend
node seedData.js
```

## 🔒 Security Checklist

### Before Production Deployment

- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Configure CORS properly (specific origins only)
- [ ] Enable HTTPS (automatic on Vercel/Netlify/Railway)
- [ ] Set up MongoDB Atlas IP whitelist
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring and error tracking
- [ ] Configure email service with app-specific passwords
- [ ] Review and update security headers

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Security → 2-Step Verification

2. **Create App Password**
   - Security → App passwords
   - Select "Mail" and "Other"
   - Copy generated password

3. **Configure Environment Variables**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=generated_app_password
```

### SendGrid (Alternative)

1. **Sign up at sendgrid.com**

2. **Create API Key**
   - Settings → API Keys
   - Create API Key with "Mail Send" permissions

3. **Update emailService.js** to use SendGrid
```javascript
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
```

## 📊 Monitoring

### Recommended Tools

1. **Sentry** (Error Tracking)
```bash
npm install @sentry/node
```

2. **New Relic** (Performance Monitoring)
```bash
npm install newrelic
```

3. **LogRocket** (Frontend Monitoring)
```bash
npm install logrocket
```

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Deploy to Vercel
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: railway up
```

## 📱 Performance Optimization

### Frontend
- Enable code splitting
- Optimize images (use Cloudinary transformations)
- Implement lazy loading
- Use CDN for static assets
- Enable service workers for offline support

### Backend
- Enable compression
- Implement caching (Redis)
- Use database indexing
- Optimize queries
- Set up load balancing for high traffic

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL in backend .env
   - Verify CORS configuration in server.js

2. **Database Connection Failed**
   - Check MongoDB URI format
   - Verify network access in MongoDB Atlas
   - Check if database user has proper permissions

3. **Email Not Sending**
   - Verify SMTP credentials
   - Check for app-specific password (Gmail)
   - Look for email service rate limits

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node version compatibility
   - Review build logs for specific errors

## 📞 Support

For deployment issues, contact: devops@alphanetwork.com
