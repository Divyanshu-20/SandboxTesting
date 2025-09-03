'use client'

import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import BuyNowButton from '../components/BuyNowButton'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/product"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-lg font-semibold text-gray-900">${item.price}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$5.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">
                    ${(getTotalPrice() + 5.99 + (getTotalPrice() * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {items.length > 0 && (
              <BuyNowButton 
                product={{
                  id: 'cart-checkout',
                  name: `Cart Checkout (${items.length} items)`,
                  price: getTotalPrice() + 5.99 + (getTotalPrice() * 0.08)
                }}
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              />
            )}
            
            <Link
              href="/product"
              className="block w-full mt-3 text-center text-indigo-600 hover:text-indigo-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
