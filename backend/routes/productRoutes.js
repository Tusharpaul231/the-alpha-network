import express from 'express'
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages
} from '../controllers/productController.js'
import { validate } from '../middleware/validator.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

// Admin routes (protected)
router.post(
  '/',
  protect,
  [
    body('name').notEmpty().trim(),
    body('slug').notEmpty().trim().toLowerCase(),
    body('category').notEmpty(),
    body('description').notEmpty(),
    validate
  ],
  createProduct
)

router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)
router.post('/:id/images', protect, uploadProductImages)

export default router