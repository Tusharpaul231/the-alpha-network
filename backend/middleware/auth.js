import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protect = async (req, res, next) => {
  try {
    let token

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get admin from token
    req.admin = await Admin.findById(decoded.id).select('-password')

    if (!req.admin || !req.admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    })
  }
}