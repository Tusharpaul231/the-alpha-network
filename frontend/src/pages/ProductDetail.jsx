import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import RequestDemoModal from '../components/RequestDemoModal'

export default function ProductDetail() {
  const { slug } = useParams()
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Set initial image when slug is available
  useEffect(() => {
    if (slug) {
      setSelectedImage(`/images/products/${slug}/image-1.jpeg`)
    }
  }, [slug])

  // Mock product data - in production, fetch from API
  const productData = {
    'alpha-restaurant-robot': {
      name: 'Alpha Restaurant Robot',
      tagline: 'Autonomous Serving Robot for Modern Hospitality',
      description: 'Transform your restaurant operations with our state-of-the-art autonomous serving robot. Equipped with advanced LIDAR navigation and AI-powered obstacle avoidance, the Alpha Restaurant Robot delivers a seamless, efficient serving experience.',
      image: '🤖',
      features: [
        'Autonomous Service Robot',
        'LIDAR Navigation',
        '10-Hour Battery Life',
        'Interactive Touch Display',
        'Multiple Serving Trays',
        'Custom Branding Options'
      ],
      specifications: {
        'Dimensions': '135cm × 45cm × 40cm',
        'Battery Life': 'Up to 10 Hours',
        'Navigation': 'LIDAR & SLAM Technology',
        'Load Capacity': '40 kg',
        'Connectivity': 'Wi-Fi, Bluetooth'
      },
      idealFor: ['Restaurants', 'Hotels', 'Cafes', 'Malls & Events', 'Hospitals'],
      faqs: [
        {
          q: 'How does the robot navigate around obstacles?',
          a: 'The Alpha Restaurant Robot uses advanced LIDAR sensors and SLAM technology to create real-time maps of its environment, allowing it to navigate safely around people, furniture, and other obstacles.'
        },
        {
          q: 'What is the charging time?',
          a: 'The robot takes approximately 2-3 hours to fully charge and can operate continuously for up to 10 hours on a single charge.'
        },
        {
          q: 'Can it be customized with our branding?',
          a: 'Yes! We offer custom branding options including logo placement, color schemes, and custom voice greetings.'
        }
      ]
    },
    'alpha-deep-tissue-massager': {
      name: 'Alpha Deep Tissue Massager',
      tagline: 'Professional-Grade Percussion Therapy Device',
      description: 'Experience professional-quality deep tissue massage therapy with our powerful 24V brushless motor. Featuring 6 speed levels and 6 interchangeable massage heads, this device is perfect for fitness centers, physiotherapy clinics, and wellness spas.',
      image: '💆',
      features: [
        'Powerful 24V Brushless Motor',
        '6 Speed Levels (up to 3300 RPM)',
        '6 Interchangeable Massage Heads',
        'Long Battery Life (up to 5 hours)',
        'Ergonomic Design',
        'Quiet Operation'
      ],
      specifications: {
        'Motor': '24V Brushless',
        'Speed Levels': '6 (1000-3300 RPM)',
        'Battery Life': 'Up to 5 Hours',
        'Massage Heads': '6 Interchangeable',
        'Carry Case': 'Included'
      },
      idealFor: ['Gyms & Fitness Centers', 'Physiotherapy Clinics', 'Wellness Spas', 'Hotels & Resorts', 'Private Coaching'],
      faqs: [
        {
          q: 'Is this suitable for professional use?',
          a: 'Yes, the Alpha Deep Tissue Massager is designed for professional use in gyms, clinics, and spas, with a durable build and long battery life.'
        },
        {
          q: 'What are the different massage heads for?',
          a: 'Each head is designed for specific muscle groups and massage techniques - from deep tissue to gentle relaxation therapy.'
        }
      ]
    },
    'interactive-flat-panel': {
      name: 'Interactive Flat Panel',
      tagline: '75" 4K Ultra HD Interactive Display for Classrooms',
      description: 'Transform your classroom with our 75-inch 4K interactive display. Preloaded with K-12 curriculum content and featuring advanced touch technology, this panel makes learning engaging and interactive.',
      image: '📺',
      features: [
        '4K UHD Touchscreen Display',
        'Preloaded K-12 Curriculum',
        'Impulse Detection Touch Technology',
        'Cloud-Based Management',
        'Multi-User Annotation',
        'Screen Mirroring Support'
      ],
      specifications: {
        'Display Size': '75 inches',
        'Resolution': '4K Ultra HD (3840×2160)',
        'Touch Points': '20-point multi-touch',
        'Connectivity': 'HDMI, USB, Wi-Fi',
        'Storage': '40 kg compatible mount'
      },
      idealFor: ['Schools & Colleges', 'Training Centers', 'Corporate Offices', 'Healthcare Facilities', 'Higher Education'],
      faqs: [
        {
          q: 'Is the curriculum customizable?',
          a: 'Yes, while it comes preloaded with K-12 content, you can add custom content and integrate with your existing learning management system.'
        },
        {
          q: 'How many students can interact simultaneously?',
          a: 'The panel supports up to 20 simultaneous touch points, allowing multiple students to interact at the same time.'
        }
      ]
    },
    'vr-solutions': {
      name: 'VR Solutions',
      tagline: 'Immersive Virtual Reality for Education & Training',
      description: 'Step into the future of education with our comprehensive VR solutions. Perfect for schools, training centers, and corporate learning environments, our VR systems provide immersive, hands-on learning experiences.',
      image: '🥽',
      features: [
        'High-Resolution VR Headsets',
        'Room-Scale Tracking',
        'Educational Content Library',
        'Multi-User Experiences',
        'Wireless Operation',
        'Easy Content Management'
      ],
      specifications: {
        'Resolution': '4K per eye',
        'Field of View': '110 degrees',
        'Tracking': '6DOF inside-out',
        'Battery': '2-3 hours',
        'Content': 'Pre-loaded educational modules'
      },
      idealFor: ['Schools & Universities', 'Training Centers', 'Museums', 'Corporate Training', 'Healthcare Education'],
      faqs: [
        {
          q: 'What kind of educational content is included?',
          a: 'Our VR systems come with a library of educational experiences including virtual field trips, science simulations, historical recreations, and vocational training modules.'
        },
        {
          q: 'Can multiple students use VR simultaneously?',
          a: 'Yes, our systems support multi-user experiences where students can learn and interact together in the same virtual environment.'
        }
      ]
    }
  }

  const product = productData[slug]

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-neutral-200">
          <div className="container-custom section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                {/* Main Image */}
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl mb-4 bg-neutral-200 flex items-center justify-center">
                  {selectedImage ? (
                    <img 
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/1200x1200?text=' + encodeURIComponent(product.name)
                      }}
                    />
                  ) : (
                    <div className="text-neutral-400 text-center">
                      <div className="text-6xl mb-4">📷</div>
                      <p>Loading image...</p>
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedImage(`/images/products/${slug}/image-${num}.jpeg`)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all bg-neutral-200 ${
                        selectedImage === `/images/products/${slug}/image-${num}.jpeg`
                          ? 'border-primary'
                          : 'border-neutral-200 hover:border-primary/50'
                      }`}
                    >
                      <img 
                        src={`/images/products/${slug}/image-${num}.jpeg`}
                        alt={`${product.name} ${num}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x300?text=Image+' + num
                        }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-neutral-600 mb-6">{product.tagline}</p>
                <p className="text-neutral-700 leading-relaxed mb-8">{product.description}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="btn-primary"
                  >
                    Request Demo
                  </button>
                  <button 
                    onClick={() => {
                      if (product.brochureUrl) {
                        window.open(product.brochureUrl, '_blank')
                      } else {
                        alert('Brochure not available for this product')
                      }
                    }}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Download size={18} />
                    <span>Download Brochure</span>
                  </button>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-900 mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-8 text-center">
                Technical Specifications
              </h2>
              <div className="max-w-3xl mx-auto bg-neutral-50 rounded-xl overflow-hidden shadow-lg">
                <div className="divide-y divide-neutral-200">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 gap-4 p-6 hover:bg-white transition-colors"
                    >
                      <div className="font-semibold text-neutral-900">{key}</div>
                      <div className="text-neutral-700">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ideal For */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-8 text-center">
                Ideal For
              </h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {product.idealFor.map((use, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                  >
                    {use}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-50 rounded-xl overflow-hidden shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white transition-colors"
                    >
                      <span className="font-semibold text-neutral-900 pr-4">{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-neutral-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-neutral-700">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
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
                Ready to experience {product.name}?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Schedule a live demonstration and see how this product can transform your business
              </p>
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Schedule a Demo Call
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      <RequestDemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  )
}