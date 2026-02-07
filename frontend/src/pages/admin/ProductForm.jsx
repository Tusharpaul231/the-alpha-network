import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { createProduct, updateProduct, getAdminProducts } from '../../services/adminApi'
import { Plus, Trash2, Save, X, Upload } from 'lucide-react'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState([])
  const [brochureFile, setBrochureFile] = useState(null)
  const isEditMode = !!id

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      category: 'Hospitality',
      tagline: '',
      description: '',
      features: [''],
      specifications: [{ key: '', value: '' }],
      idealFor: [''],
      faqs: [{ question: '', answer: '' }],
      images: [],
      isActive: true
    }
  })

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features'
  })

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: 'specifications'
  })

  const { fields: idealForFields, append: appendIdealFor, remove: removeIdealFor } = useFieldArray({
    control,
    name: 'idealFor'
  })

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: 'faqs'
  })

  // Auto-generate slug from name
  const watchName = watch('name')
  useEffect(() => {
    if (watchName && !isEditMode) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setValue('slug', slug)
    }
  }, [watchName, setValue, isEditMode])

  // Load product data if editing
  useEffect(() => {
    if (isEditMode) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      const response = await getAdminProducts()
      const product = response.data.find(p => p._id === id)
      
      if (!product) {
        alert('Product not found')
        navigate('/admin/products')
        return
      }

      // Convert specifications Map to array
      const specsArray = Object.entries(product.specifications || {}).map(([key, value]) => ({
        key,
        value
      }))

      reset({
        name: product.name,
        slug: product.slug,
        category: product.category,
        tagline: product.tagline || '',
        description: product.description,
        features: product.features || [''],
        specifications: specsArray.length > 0 ? specsArray : [{ key: '', value: '' }],
        idealFor: product.idealFor || [''],
        faqs: product.faqs || [{ question: '', answer: '' }],
        isActive: product.isActive
      })

      if (product.images) {
        setImagePreview(product.images.map(img => img.url))
      }

      if (product.brochureUrl) {
        setBrochureFile({
          name: 'Product Brochure',
          data: product.brochureUrl,
          type: 'application/pdf'
        })
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Failed to load product')
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + imagePreview.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index))
  }

  const handleBrochureUpload = (e) => {
    const file = e.target.files[0]
    
    if (!file) return
    
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type)) {
      alert('Please upload PDF or DOCX file only')
      return
    }
    
    // Check file size (2MB max)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 2MB')
      return
    }
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setBrochureFile({
        name: file.name,
        data: reader.result,
        type: file.type
      })
    }
    reader.readAsDataURL(file)
  }

  const removeBrochure = () => {
    setBrochureFile(null)
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      // Convert specifications array to object
      const specificationsObj = {}
      data.specifications.forEach(spec => {
        if (spec.key && spec.value) {
          specificationsObj[spec.key] = spec.value
        }
      })

      // Filter empty values
      const cleanData = {
        ...data,
        features: data.features.filter(f => f.trim()),
        specifications: specificationsObj,
        idealFor: data.idealFor.filter(i => i.trim()),
        faqs: data.faqs.filter(faq => faq.question && faq.answer),
        images: imagePreview.map((url, index) => ({
          url,
          publicId: `product-${data.slug}-${index}`
        })),
        brochureUrl: brochureFile?.data || null  // Add this
      }

      if (isEditMode) {
        await updateProduct(id, cleanData)
        alert('Product updated successfully!')
      } else {
        await createProduct(cleanData)
        alert('Product created successfully!')
      }

      navigate('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      alert(error.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X size={20} />
          <span>Cancel</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Product name is required' })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Alpha Restaurant Robot"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                {...register('slug', { required: 'Slug is required' })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="alpha-restaurant-robot"
              />
              {errors.slug && (
                <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="Hospitality">Hospitality</option>
                <option value="Education">Education</option>
                <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tagline *
              </label>
              <input
                type="text"
                {...register('tagline', { required: 'Tagline is required' })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Autonomous Serving Robot for Modern Hospitality"
              />
              {errors.tagline && (
                <p className="text-red-500 text-xs mt-1">{errors.tagline.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="4"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder="Enter detailed product description..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Product Images</h2>
          
          <div className="mb-4">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="text-center">
                <Upload className="mx-auto mb-2 text-neutral-400" size={32} />
                <p className="text-sm text-neutral-600">Click to upload images (Max 5)</p>
                <p className="text-xs text-neutral-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {imagePreview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {imagePreview.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brochure Upload */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Product Brochure</h2>
          
          <div className="mb-4">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="text-center">
                <Upload className="mx-auto mb-2 text-neutral-400" size={32} />
                <p className="text-sm text-neutral-600">Click to upload brochure</p>
                <p className="text-xs text-neutral-500 mt-1">PDF or DOCX (Max 2MB)</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleBrochureUpload}
                className="hidden"
              />
            </label>
          </div>

          {brochureFile && (
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{brochureFile.name}</p>
                  <p className="text-xs text-neutral-500">
                    {brochureFile.type === 'application/pdf' ? 'PDF Document' : 'Word Document'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeBrochure}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Features</h2>
            <button
              type="button"
              onClick={() => appendFeature('')}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <Plus size={16} />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-3">
            {featureFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`features.${index}`)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g., Autonomous Service Robot"
                />
                {featureFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Specifications</h2>
            <button
              type="button"
              onClick={() => appendSpec({ key: '', value: '' })}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <Plus size={16} />
              <span>Add Specification</span>
            </button>
          </div>

          <div className="space-y-3">
            {specFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`specifications.${index}.key`)}
                  className="w-1/3 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Key (e.g., Dimensions)"
                />
                <input
                  {...register(`specifications.${index}.value`)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Value (e.g., 135cm × 45cm × 40cm)"
                />
                {specFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ideal For */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Ideal For</h2>
            <button
              type="button"
              onClick={() => appendIdealFor('')}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <Plus size={16} />
              <span>Add Use Case</span>
            </button>
          </div>

          <div className="space-y-3">
            {idealForFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`idealFor.${index}`)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g., Restaurants"
                />
                {idealForFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIdealFor(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">FAQs</h2>
            <button
              type="button"
              onClick={() => appendFaq({ question: '', answer: '' })}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              <Plus size={16} />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-6">
            {faqFields.map((field, index) => (
              <div key={field.id} className="p-4 border border-neutral-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-neutral-900">FAQ {index + 1}</h3>
                  {faqFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    {...register(`faqs.${index}.question`)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Question"
                  />
                  <textarea
                    {...register(`faqs.${index}.answer`)}
                    rows="3"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Answer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Status</h2>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('isActive')}
              className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-2 focus:ring-primary"
            />
            <span className="text-neutral-700">Product is active and visible to users</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}