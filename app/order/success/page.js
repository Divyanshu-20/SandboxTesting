'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and payment has been processed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">{orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium text-gray-900">{paymentId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Paid</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/product"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            View Product
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            You will receive an email confirmation shortly. 
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}
