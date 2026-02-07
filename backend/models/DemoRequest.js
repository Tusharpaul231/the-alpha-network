import mongoose from 'mongoose'

const demoRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    product: {
      type: String,
      required: [true, 'Product selection is required']
    },
    companyName: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending','on-progress', 'contacted', 'deal-closed-success', 'deal-closed-canceled'],
      default: 'pending'
    },
    source: {
      type: String,
      default: 'website'
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Index for efficient queries
demoRequestSchema.index({ email: 1, createdAt: -1 })
demoRequestSchema.index({ status: 1 })

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema)

export default DemoRequest
