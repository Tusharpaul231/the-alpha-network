import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RequestDemoModal from './RequestDemoModal'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">α</span>
            </div>
            <span className="font-display font-bold text-xl text-neutral-900 hidden sm:block">
              THE ALPHA NETWORK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-neutral-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="btn-primary text-sm hidden sm:block"
            >
              Request Demo
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-200 bg-white"
            >
              <nav className="container-custom py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-base font-medium transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-neutral-700'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    setShowDemoModal(true)
                    setMobileMenuOpen(false)
                  }}
                  className="btn-primary text-sm w-full"
                >
                  Request Demo
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20"></div>

      {/* Request Demo Modal */}
      <RequestDemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  )
}
