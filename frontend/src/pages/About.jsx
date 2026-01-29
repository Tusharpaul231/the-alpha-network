import { motion } from 'framer-motion'
import { Globe, Target, Users, Award } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: <Globe size={40} />,
      title: 'Global Excellence',
      description: 'We partner with the world\'s leading AI manufacturers to bring you cutting-edge technology that sets industry standards.'
    },
    {
      icon: <Target size={40} />,
      title: 'Local Expertise',
      description: 'Our team understands your market, speaks your language, and provides support that\'s always within reach.'
    },
    {
      icon: <Users size={40} />,
      title: 'Customer Success',
      description: 'Your success is our success. We\'re committed to ensuring every implementation delivers measurable business value.'
    },
    {
      icon: <Award size={40} />,
      title: 'Quality Assurance',
      description: 'Every product we source undergoes rigorous testing and quality control to meet our high standards.'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a vision to democratize enterprise AI' },
    { year: '2021', title: 'First Deployment', description: 'Successfully deployed our first AI solution' },
    { year: '2023', title: 'Regional Expansion', description: 'Expanded operations across multiple markets' },
    { year: '2024', title: 'Industry Leader', description: 'Became a trusted AI integration partner' }
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
              About The Alpha Network
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bridging the gap between global AI innovation and local enterprise needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The Alpha Network was born from a simple observation: while AI technology is advancing rapidly worldwide, many businesses struggle to access, implement, and maintain these solutions effectively.
                </p>
                <p>
                  We exist to solve this problem. By combining global product sourcing with local integration expertise, we make enterprise AI accessible, practical, and profitable for businesses of all sizes.
                </p>
                <p>
                  Our team brings together AI specialists, integration engineers, and industry experts who understand both the technology and the unique challenges facing your business.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🌐</div>
                  <p className="font-display font-bold text-2xl text-neutral-900">
                    Global Innovation
                  </p>
                  <p className="text-neutral-600 mt-2">Local Implementation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Target size={32} />
              </div>
              <h3 className="font-display font-bold text-2xl text-neutral-900 mb-4">
                Our Mission
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                To democratize access to enterprise-grade AI solutions by bridging the gap between global innovation and local implementation, ensuring every business can harness the power of AI to transform their operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Globe size={32} />
              </div>
              <h3 className="font-display font-bold text-2xl text-neutral-900 mb-4">
                Our Vision
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                To become the world's most trusted AI integration partner, known for turning cutting-edge technology into practical business solutions that deliver measurable ROI and lasting competitive advantage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Three-Pillar Approach
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Global Intelligence Sourcing',
                description: 'We continuously monitor and evaluate AI innovations worldwide, partnering only with manufacturers who meet our strict quality and reliability standards.'
              },
              {
                number: '02',
                title: 'Localized B2B Integration',
                description: 'Our integration team tailors each solution to your specific business context, ensuring seamless deployment and adoption within your existing workflows.'
              },
              {
                number: '03',
                title: 'Managed Implementation (AI-as-a-Service)',
                description: 'From initial setup to ongoing optimization, we provide comprehensive support that ensures your AI investments deliver consistent, measurable value.'
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-6xl font-display font-bold text-primary/20 mb-4">
                  {pillar.number}
                </div>
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-neutral-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform enterprise AI
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                      <span className="font-display font-bold text-2xl text-white">
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow pt-4">
                    <h3 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Ready to start your AI journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with AI
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
