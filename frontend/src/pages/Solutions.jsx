import { motion } from 'framer-motion'
import { Building2, GraduationCap, Heart, Briefcase } from 'lucide-react'
import { useState } from 'react'
import RequestDemoModal from '../components/RequestDemoModal'

export default function Solutions() {
  const [showDemoModal, setShowDemoModal] = useState(false)

  const solutions = [
    {
      icon: <Building2 size={48} />,
      title: 'AI for Hospitality',
      problem: 'Restaurants and hotels struggle with labor shortages, high operational costs, and maintaining consistent service quality during peak hours.',
      solution: 'Our autonomous robots and smart systems streamline operations, reduce wait times, and enhance guest experiences while cutting labor costs by up to 30%.',
      products: ['Alpha Restaurant Robot', 'Interactive Displays'],
      benefits: ['24/7 Operation', 'Reduced Labor Costs', 'Enhanced Guest Experience', 'Scalable Deployment']
    },
    {
      icon: <GraduationCap size={48} />,
      title: 'AI for Education',
      problem: 'Traditional teaching methods struggle to engage digital-native students and provide personalized learning experiences at scale.',
      solution: 'Our interactive panels and VR systems create immersive learning environments that increase engagement, improve retention, and enable personalized education.',
      products: ['Interactive Flat Panel', 'VR Solutions'],
      benefits: ['Increased Engagement', 'Personalized Learning', 'Immersive Experiences', 'Better Outcomes']
    },
    {
      icon: <Heart size={48} />,
      title: 'AI for Healthcare & Wellness',
      problem: 'Healthcare facilities need advanced therapeutic equipment and training tools that are both effective and accessible.',
      solution: 'Our therapy devices and VR training systems provide professional-grade treatment options and realistic medical training simulations.',
      products: ['Alpha Deep Tissue Massager', 'VR Training Solutions'],
      benefits: ['Professional Quality', 'Cost Effective', 'Training Excellence', 'Patient Satisfaction']
    },
    {
      icon: <Briefcase size={48} />,
      title: 'AI for Enterprises',
      problem: 'Businesses struggle to identify, implement, and maintain AI solutions that actually deliver ROI and integrate with existing workflows.',
      solution: 'We provide end-to-end AI integration services - from global product sourcing to local deployment, training, and ongoing support.',
      products: ['Custom Integration', 'Managed Deployment'],
      benefits: ['Turnkey Solutions', 'Local Support', 'Proven ROI', 'Ongoing Optimization']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Industry-Specific AI Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We don't just sell AI products - we deliver complete solutions tailored to your industry's unique challenges and opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-24">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Icon & Title */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {solution.icon}
                </div>
                <h2 className="font-display font-bold text-3xl text-neutral-900 mb-6">
                  {solution.title}
                </h2>
                
                {/* Products */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {solution.products.map((product, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  {solution.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem & Solution */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 mb-6">
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                    The Challenge
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{solution.problem}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                    Our Solution
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">{solution.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Alpha Network */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Why Choose The Alpha Network?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We bridge the gap between global AI innovation and local enterprise needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Global Sourcing + Local Execution',
                description: 'Access world-class AI products with the comfort of local deployment, training, and support in your language and timezone.'
              },
              {
                title: 'Compliance-Ready',
                description: 'All our solutions meet local regulatory requirements and industry standards, ensuring hassle-free implementation.'
              },
              {
                title: 'ROI-Focused Deployment',
                description: 'We don\'t just sell products - we ensure your AI investments deliver measurable business outcomes and positive ROI.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600">{item.description}</p>
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
              Let's solve your business challenges together
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Talk to our experts about how AI can transform your operations
            </p>
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Talk to an Expert
            </button>
          </motion.div>
        </div>
      </section>

      <RequestDemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  )
}
