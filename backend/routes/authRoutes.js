import express from 'express'
import { login, getCurrentAdmin, setupAdmin } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Setup initial admin (run once)
router.post(
  '/setup',
  [
    body('username').notEmpty().trim().toLowerCase(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    validate
  ],
  setupAdmin
)

// Login
router.post(
  '/login',
  [
    body('username').notEmpty().trim(),
    body('password').notEmpty(),
    validate
  ],
  login
)

// Get current admin
router.get('/me', protect, getCurrentAdmin)

export default router