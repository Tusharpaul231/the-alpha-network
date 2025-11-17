Production package for Alpha Access System
-----------------------------------------
Structure:
- backend/ (Node.js + Express + Mongoose)
- public_html/login/ (frontend login)
- public_html/the-alpha-network/public/ (main site)

Setup:
1. Extract package to your server.
2. Edit backend/.env with MONGO_URI and SMTP credentials.
3. Install backend deps:
   cd backend
   npm install
4. Start server:
   npm run dev
5. Point domain root to serve public_html/index.html (or use server to serve login)

Notes:
- Exports go to backend/exports/
- Admin routes under /admin (see backend/routes/adminRoutes.js)
