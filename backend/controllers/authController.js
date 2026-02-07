import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    // Check if admin exists
    const admin = await Admin.findOne({ username, isActive: true })
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    
    res.json({
      success: true,
      admin
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create initial admin (run once)
// @route   POST /api/auth/setup
// @access  Public (only if no admins exist)
export const setupAdmin = async (req, res, next) => {
  try {
    // Check if any admin exists
    const adminCount = await Admin.countDocuments()
    if (adminCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      })
    }

    const { username, email, password } = req.body

    const admin = await Admin.create({
      username,
      email,
      password,
      role: 'superadmin'
    })

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        username: admin.username,
        email: admin.email
      }
    })
  } catch (error) {
    next(error)
  }
}