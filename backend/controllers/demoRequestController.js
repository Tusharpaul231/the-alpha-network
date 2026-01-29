import DemoRequest from '../models/DemoRequest.js'
import { sendDemoRequestEmail } from '../utils/emailService.js'

// @desc    Submit demo request
// @route   POST /api/demo-requests
// @access  Public
export const submitDemoRequest = async (req, res, next) => {
  try {
    const { fullName, email, phone, product, companyName, message } = req.body

    // Create demo request
    const demoRequest = await DemoRequest.create({
      fullName,
      email,
      phone,
      product,
      companyName,
      message
    })

    // Send confirmation email (async, don't wait)
    sendDemoRequestEmail(demoRequest).catch(err => 
      console.error('Email send error:', err)
    )

    res.status(201).json({
      success: true,
      message: 'Demo request submitted successfully',
      data: {
        id: demoRequest._id,
        fullName: demoRequest.fullName,
        email: demoRequest.email,
        product: demoRequest.product
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all demo requests (Admin only)
// @route   GET /api/demo-requests
// @access  Private/Admin
export const getDemoRequests = async (req, res, next) => {
  try {
    const { status, limit = 50, page = 1 } = req.query

    let query = {}
    if (status) {
      query.status = status
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [demoRequests, total] = await Promise.all([
      DemoRequest.find(query)
        .limit(parseInt(limit))
        .skip(skip)
        .sort({ createdAt: -1 }),
      DemoRequest.countDocuments(query)
    ])

    res.json({
      success: true,
      count: demoRequests.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: demoRequests
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update demo request status (Admin only)
// @route   PATCH /api/demo-requests/:id
// @access  Private/Admin
export const updateDemoRequestStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body

    const demoRequest = await DemoRequest.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    )

    if (!demoRequest) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      })
    }

    res.json({
      success: true,
      data: demoRequest
    })
  } catch (error) {
    next(error)
  }
}
