'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderFailure() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const error = searchParams.get('error')

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'verification_failed':
        return 'Payment verification failed. Please contact support.'
      case 'verification_error':
        return 'Unable to verify payment. Please try again.'
      case 'payment_failed':
        return 'Payment was declined. Please try a different payment method.'
      default:
        return 'Payment was not completed. Please try again.'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {getErrorMessage(error)}
        </p>

        {/* Order Details */}
        {orderId && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-red-600">Failed</span>
              </div>
              {error && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Error:</span>
                  <span className="font-medium text-red-600">{error}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/product"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you continue to experience issues, please contact our support team 
            with your order ID for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
