'use client'

import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import BuyNowButton from '../components/BuyNowButton'

export default function Product() {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('M')
  const [showAdded, setShowAdded] = useState(false)

  const product = {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    description: 'Our premium cotton t-shirt is crafted from 100% organic cotton, ensuring maximum comfort and durability. Perfect for everyday wear, this classic fit t-shirt features a soft hand feel and excellent color retention.',
    features: [
      '100% Organic Cotton',
      'Pre-shrunk fabric',
      'Reinforced seams',
      'Tagless for comfort',
      'Machine washable'
    ]
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize })
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Product Image */}
        <div className="flex flex-col-reverse">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
              <p>
                Available in multiple colors and sizes, this versatile piece 
                will become a staple in your wardrobe. Machine washable and 
                designed to maintain its shape and softness wash after wash.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <BuyNowButton 
                product={product}
                className="flex-1 border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900">Size Guide</h3>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-2 px-4 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    selectedSize === size
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
