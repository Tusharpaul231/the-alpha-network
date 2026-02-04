import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Settings, Zap } from 'lucide-react'
import { useState } from 'react'
import RequestDemoModal from '../components/RequestDemoModal'

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Alpha Massager',
      description: 'Advanced Therapy Device',
      image: '/images/massager.jpg',
      slug: 'alpha-deep-tissue-massager'
    },
    {
      id: 2,
      name: 'VR Solutions',
      description: 'Immersive Education & Tours',
      image: '/images/vr.jpg',
      slug: 'vr-solutions'
    },
    {
      id: 3,
      name: 'Interactive Flat Panel',
      description: '4K Smart Classroom Display',
      image: '/images/flat-panel.jpg',
      slug: 'interactive-flat-panel'
    }
  ]

  const pillars = [
    {
      icon: <Globe size={40} />,
      title: 'Global Intelligence Sourcing',
      description:
        'We partner with world-leading AI manufacturers to bring you cutting-edge technology'
    },
    {
      icon: <Settings size={40} />,
      title: 'Localized Integration',
      description:
        'Seamless deployment tailored to your business needs with dedicated local support'
    },
    {
      icon: <Zap size={40} />,
      title: 'AI-as-a-Service',
      description:
        'Complete managed implementation with training, maintenance, and ongoing optimization'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-100 overflow-hidden">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-tight mb-6">
                Transforming Global AI Innovation
                <span className="text-primary"> Into Local Enterprise Power</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We source world-class AI products and integrate them into your business with
                localized deployment and support.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setShowDemoModal(true)} className="btn-primary">
                  Request Demo
                </button>
                <button className="btn-secondary">Download Brochure</button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-200">
                  <img 
                    src="/images/hero/restaurant-robot.png" 
                    alt="Alpha Restaurant Robot"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = 'https://via.placeholder.com/800x800?text=Restaurant+Robot'
                    }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="font-display font-bold text-2xl text-neutral-900">Alpha Restaurant Robot</p>
                  <p className="text-neutral-600 mt-2">Autonomous Serving Robot</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our range of AI-powered solutions designed for modern enterprises
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img 
                    src={`/images/featured/${product.slug}.jpeg`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600?text=' + encodeURIComponent(product.name)
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-neutral-600 mb-4">{product.description}</p>
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${product.slug}`}
                      className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Product Banner */}
      <section className="section-padding bg-gradient-to-br from-neutral-800 to-neutral-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Alpha Restaurant Robot
              </h2>
              <p className="text-xl text-neutral-300 mb-8">
                Autonomous Serving Robot for Modern Hospitality
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Autonomous Service Robot</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>LIDAR Navigation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>10-Hour Battery Life</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Interactive Touch Display</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="px-6 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-dark transition-all duration-300"
                >
                  Book Live Demo
                </button>
                <button className="px-6 py-3 bg-white text-neutral-900 font-semibold rounded-md hover:bg-neutral-100 transition-all duration-300">
                  Download Specs
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-neutral-200">
                <img 
                  src="/images/products/alpha-restaurant-robot/main.jpeg"
                  alt="Alpha Restaurant Robot"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x800?text=Alpha+Restaurant+Robot'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Core Pillars
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Three foundational principles that drive our approach to AI integration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-neutral-50 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-neutral-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Ready to integrate AI into your business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how The Alpha Network can transform your operations with cutting-edge AI
              solutions
            </p>
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Book a Consultation</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <RequestDemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  )
}
