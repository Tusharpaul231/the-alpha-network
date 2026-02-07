import mongoose from 'mongoose'

const querySchema = new mongoose.Schema(
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
    query: {
      type: String,
      required: [true, 'Query message is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'on-progress', 'solved'],
      default: 'new'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    responseNotes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Index for efficient queries
querySchema.index({ email: 1, createdAt: -1 })
querySchema.index({ status: 1 })

const Query = mongoose.model('Query', querySchema)

export default Query
