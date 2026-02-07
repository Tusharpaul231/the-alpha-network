import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Solutions from './pages/Solutions'
import About from './pages/About'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

// Admin imports
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import DemoRequests from './pages/admin/DemoRequests'
import Queries from './pages/admin/Queries'
import AdminProducts from './pages/admin/Products'
import ProductForm from './pages/admin/ProductForm'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/products" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Products />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/products/:slug" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <ProductDetail />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/solutions" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Solutions />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />  {/* Add this */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="demo-requests" element={<DemoRequests />} />
          <Route path="queries" element={<Queries />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App