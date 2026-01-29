import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Hospitality', 'Education', 'Healthcare & Wellness', 'Enterprise']
    },
    tagline: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    features: [{
      type: String
    }],
    specifications: {
      type: Map,
      of: String
    },
    idealFor: [{
      type: String
    }],
    images: [{
      url: String,
      publicId: String
    }],
    brochureUrl: {
      type: String
    },
    price: {
      currency: {
        type: String,
        default: 'USD'
      },
      amount: Number,
      displayPrice: String // e.g., "Contact for pricing"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    metadata: {
      views: {
        type: Number,
        default: 0
      },
      demoRequests: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
)

// Index for search
productSchema.index({ name: 'text', description: 'text' })

const Product = mongoose.model('Product', productSchema)

export default Product
