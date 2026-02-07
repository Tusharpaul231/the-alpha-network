import express from 'express'
import {
  submitQuery,
  getQueries,
  updateQueryStatus
} from '../controllers/queryController.js'
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
    body('query').notEmpty().trim().isLength({ min: 10 }),
    validate
  ],
  submitQuery
)

// Admin routes (protected)
router.get('/', protect, getQueries)
router.patch('/:id', protect, updateQueryStatus)

export default router