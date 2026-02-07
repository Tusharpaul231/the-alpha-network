import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProducts } from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      setProducts(response.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-500">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Our AI Product Portfolio
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover our curated selection of enterprise-grade AI solutions sourced from global leaders
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden bg-neutral-200">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(product.name)
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-8xl">
                          📦
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="md:w-3/5 p-6 flex flex-col">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-neutral-900 mb-3">
                        {product.name}
                      </h3>
                      <p className="text-neutral-600 mb-4 flex-grow line-clamp-3">
                        {product.tagline || product.description}
                      </p>

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {product.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-neutral-700">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <Link
                        to={`/products/${product.slug}`}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors group-hover:shadow-lg"
                      >
                        <span>View Details</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                We source custom AI solutions tailored to your specific business needs
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Contact Our Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}