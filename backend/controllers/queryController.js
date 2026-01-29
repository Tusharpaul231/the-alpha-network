import Query from '../models/Query.js'
import { sendQueryConfirmationEmail } from '../utils/emailService.js'

// @desc    Submit contact query
// @route   POST /api/queries
// @access  Public
export const submitQuery = async (req, res, next) => {
  try {
    const { fullName, email, phone, query } = req.body

    // Create query
    const newQuery = await Query.create({
      fullName,
      email,
      phone,
      query
    })

    // Send confirmation email (async, don't wait)
    sendQueryConfirmationEmail(newQuery).catch(err => 
      console.error('Email send error:', err)
    )

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully. We will get back to you soon.',
      data: {
        id: newQuery._id,
        fullName: newQuery.fullName,
        email: newQuery.email
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all queries (Admin only)
// @route   GET /api/queries
// @access  Private/Admin
export const getQueries = async (req, res, next) => {
  try {
    const { status, priority, limit = 50, page = 1 } = req.query

    let query = {}
    if (status) query.status = status
    if (priority) query.priority = priority

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [queries, total] = await Promise.all([
      Query.find(query)
        .limit(parseInt(limit))
        .skip(skip)
        .sort({ createdAt: -1 }),
      Query.countDocuments(query)
    ])

    res.json({
      success: true,
      count: queries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: queries
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update query status (Admin only)
// @route   PATCH /api/queries/:id
// @access  Private/Admin
export const updateQueryStatus = async (req, res, next) => {
  try {
    const { status, priority, responseNotes } = req.body

    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { status, priority, responseNotes },
      { new: true, runValidators: true }
    )

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      })
    }

    res.json({
      success: true,
      data: query
    })
  } catch (error) {
    next(error)
  }
}
