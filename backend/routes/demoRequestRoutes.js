import express from 'express'
import {
  submitDemoRequest,
  getDemoRequests,
  updateDemoRequestStatus
} from '../controllers/demoRequestController.js'
import { validate } from '../middleware/validator.js'
import { body } from 'express-validator'
import { rateLimiter } from '../middleware/rateLimiter.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Public route with rate limiting
router.post(
  '/',
  rateLimiter,
  [
    body('fullName').notEmpty().trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').notEmpty().trim(),
    body('product').notEmpty(),
    validate
  ],
  submitDemoRequest
)

// Admin routes (protected)
router.get('/', protect, getDemoRequests)
router.patch('/:id', protect, updateDemoRequestStatus)

export default router