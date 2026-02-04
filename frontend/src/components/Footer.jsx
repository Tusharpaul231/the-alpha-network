import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">α</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                ALPHA NETWORK
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Transforming Global AI Innovation Into Local Enterprise Power. We source world-class
              AI products and integrate them into your business with localized deployment and
              support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">Connect With Us</h3>
            <div className="space-y-3 text-sm mb-6">
              <p>
                <span className="font-semibold text-white">Email:</span>
                <br />
                support@thealphanetwork.in
              </p>
              <p>
                <span className="font-semibold text-white">Phone:</span>
                <br />
                +91 70740-41201
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61586649506436"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/01thealphanetwork/"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-center">
          <p>© {currentYear} The Alpha Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
