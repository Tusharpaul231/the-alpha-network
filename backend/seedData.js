import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const products = [
  {
    name: 'Alpha Restaurant Robot',
    slug: 'alpha-restaurant-robot',
    category: 'Hospitality',
    tagline: 'Autonomous Serving Robot for Modern Hospitality',
    description: 'Transform your restaurant operations with our state-of-the-art autonomous serving robot. Equipped with advanced LIDAR navigation and AI-powered obstacle avoidance, the Alpha Restaurant Robot delivers a seamless, efficient serving experience.',
    features: [
      'Autonomous Service Robot',
      'LIDAR Navigation',
      '10-Hour Battery Life',
      'Interactive Touch Display',
      'Multiple Serving Trays',
      'Custom Branding Options'
    ],
    specifications: new Map([
      ['Dimensions', '135cm × 45cm × 40cm'],
      ['Battery Life', 'Up to 10 Hours'],
      ['Navigation', 'LIDAR & SLAM Technology'],
      ['Load Capacity', '40 kg'],
      ['Connectivity', 'Wi-Fi, Bluetooth']
    ]),
    idealFor: ['Restaurants', 'Hotels', 'Cafes', 'Malls & Events', 'Hospitals'],
    price: {
      currency: 'USD',
      displayPrice: 'Contact for pricing'
    },
    isActive: true
  },
  {
    name: 'Alpha Deep Tissue Massager',
    slug: 'alpha-deep-tissue-massager',
    category: 'Healthcare & Wellness',
    tagline: 'Professional-Grade Percussion Therapy Device',
    description: 'Experience professional-quality deep tissue massage therapy with our powerful 24V brushless motor. Featuring 6 speed levels and 6 interchangeable massage heads, this device is perfect for fitness centers, physiotherapy clinics, and wellness spas.',
    features: [
      'Powerful 24V Brushless Motor',
      '6 Speed Levels (up to 3300 RPM)',
      '6 Interchangeable Massage Heads',
      'Long Battery Life (up to 5 hours)',
      'Ergonomic Design',
      'Quiet Operation'
    ],
    specifications: new Map([
      ['Motor', '24V Brushless'],
      ['Speed Levels', '6 (1000-3300 RPM)'],
      ['Battery Life', 'Up to 5 Hours'],
      ['Massage Heads', '6 Interchangeable'],
      ['Carry Case', 'Included']
    ]),
    idealFor: ['Gyms & Fitness Centers', 'Physiotherapy Clinics', 'Wellness Spas', 'Hotels & Resorts', 'Private Coaching'],
    price: {
      currency: 'USD',
      displayPrice: 'Starting from $299'
    },
    isActive: true
  },
  {
    name: 'Interactive Flat Panel',
    slug: 'interactive-flat-panel',
    category: 'Education',
    tagline: '75" 4K Ultra HD Interactive Display for Classrooms',
    description: 'Transform your classroom with our 75-inch 4K interactive display. Preloaded with K-12 curriculum content and featuring advanced touch technology, this panel makes learning engaging and interactive.',
    features: [
      '4K UHD Touchscreen Display',
      'Preloaded K-12 Curriculum',
      'Impulse Detection Touch Technology',
      'Cloud-Based Management',
      'Multi-User Annotation',
      'Screen Mirroring Support'
    ],
    specifications: new Map([
      ['Display Size', '75 inches'],
      ['Resolution', '4K Ultra HD (3840×2160)'],
      ['Touch Points', '20-point multi-touch'],
      ['Connectivity', 'HDMI, USB, Wi-Fi'],
      ['Storage', '40 kg compatible mount']
    ]),
    idealFor: ['Schools & Colleges', 'Training Centers', 'Corporate Offices', 'Healthcare Facilities', 'Higher Education'],
    price: {
      currency: 'USD',
      displayPrice: 'Contact for pricing'
    },
    isActive: true
  },
  {
    name: 'VR Solutions',
    slug: 'vr-solutions',
    category: 'Education',
    tagline: 'Immersive Virtual Reality for Education & Training',
    description: 'Step into the future of education with our comprehensive VR solutions. Perfect for schools, training centers, and corporate learning environments, our VR systems provide immersive, hands-on learning experiences.',
    features: [
      'High-Resolution VR Headsets',
      'Room-Scale Tracking',
      'Educational Content Library',
      'Multi-User Experiences',
      'Wireless Operation',
      'Easy Content Management'
    ],
    specifications: new Map([
      ['Resolution', '4K per eye'],
      ['Field of View', '110 degrees'],
      ['Tracking', '6DOF inside-out'],
      ['Battery', '2-3 hours'],
      ['Content', 'Pre-loaded educational modules']
    ]),
    idealFor: ['Schools & Universities', 'Training Centers', 'Museums', 'Corporate Training', 'Healthcare Education'],
    price: {
      currency: 'USD',
      displayPrice: 'Starting from $1,999'
    },
    isActive: true
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    // Clear existing products
    await Product.deleteMany({})
    console.log('🗑️  Cleared existing products')

    // Insert new products
    await Product.insertMany(products)
    console.log('✅ Seed data inserted successfully')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
