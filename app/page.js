'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from './context/CartContext'

export default function Home() {
  const { addToCart } = useCart()

  const featuredProduct = {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
    description: 'Made from 100% organic cotton. Soft, comfortable, and perfect for any occasion.'
  }

  const handleQuickAdd = () => {
    addToCart({ ...featuredProduct, size: 'M' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Premium Quality T-Shirts
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Comfortable, stylish, and made with the finest materials. 
          Perfect for everyday wear or special occasions.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            href="/product"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Buy Our T-Shirt
          </Link>
        </div>
      </div>

      {/* Product Preview */}
      <div className="mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Featured Product</h2>
          <p className="mt-4 text-lg text-gray-600">
            Check out our best-selling premium cotton t-shirt
          </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{featuredProduct.name}</h3>
              <p className="mt-2 text-gray-600">
                {featuredProduct.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${featuredProduct.price}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={handleQuickAdd}
                    className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Quick Add
                  </button>
                  <Link
                    href="/product"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
