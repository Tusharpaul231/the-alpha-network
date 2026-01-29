import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitContactQuery } from '../services/api'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  query: z.string().min(10, 'Query must be at least 10 characters')
})

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    try {
      await submitContactQuery(data)
      alert('Your query has been submitted! We will get back to you soon.')
      reset()
    } catch (error) {
      alert('Failed to submit query. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'support@thealphanetwork.in',
      link: 'mailto:support@thealphanetwork.in'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+2 3055 386-6919',
      link: 'tel:+23055386919'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Office',
      value: 'Siliguri, West Bengal, India',
      link: null
    }
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, label: 'Facebook', url: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', url: '#' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', url: '#' }
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
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions about our products or services? We're here to help you find the perfect AI solution for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-6">
                Ask a Query
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Query *
                  </label>
                  <textarea
                    {...register('query')}
                    rows="5"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.query && (
                    <p className="text-red-500 text-xs mt-1">{errors.query.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Query'}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display font-bold text-3xl text-neutral-900 mb-6">
                Contact Information
              </h2>
              <p className="text-neutral-600 mb-8">
                Reach out to us through any of these channels. We're always happy to hear from you!
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-neutral-600 hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-neutral-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      aria-label={social.label}
                      className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 bg-neutral-50 rounded-xl p-6">
                <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-neutral-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-neutral-900 mb-8 text-center">
              Our Location
            </h2>
            <div className="aspect-[21/9] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 text-lg">
                  Map integration placeholder
                </p>
                <p className="text-neutral-500 text-sm mt-2">
                  Siliguri, West Bengal, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
