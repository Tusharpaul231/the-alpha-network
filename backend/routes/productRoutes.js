import express from 'express'
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'
import { validate } from '../middleware/validator.js'
import { body } from 'express-validator'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

// Admin routes (add auth middleware in production)
router.post(
  '/',
  [
    body('name').notEmpty().trim(),
    body('slug').notEmpty().trim().toLowerCase(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    validate
  ],
  createProduct
)

router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
