import express from 'express'
import {
  submitDemoRequest,
  getDemoRequests,
  updateDemoRequestStatus
} from '../controllers/demoRequestController.js'
import { validate } from '../middleware/validator.js'
import { body } from 'express-validator'
import { rateLimiter } from '../middleware/rateLimiter.js'

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

// Admin routes (add auth middleware in production)
router.get('/', getDemoRequests)
router.patch('/:id', updateDemoRequestStatus)

export default router
