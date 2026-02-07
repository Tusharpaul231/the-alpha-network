import Product from '../models/Product.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, limit = 50 } = req.query

    let query = { isActive: true }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$text = { $search: search }
    }

    const products = await Product.find(query)
      .limit(parseInt(limit))
      .select('-__v')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ 
      slug: req.params.slug,
      isActive: true 
    })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Increment view count
    product.metadata.views += 1
    await product.save()

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Soft delete - just mark as inactive
    product.isActive = false
    await product.save()

    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
export const uploadProductImages = async (req, res, next) => {
  try {
    const { images } = req.body // Array of base64 or URLs

    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Add images to product
    product.images = images.map((img, index) => ({
      url: img,
      publicId: `product-${product._id}-${index}`
    }))

    await product.save()

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}