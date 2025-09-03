'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

export default function BuyNowButton({ product, className = '' }) {
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true)
    }
  }, [])

  const handleBuyNow = async () => {
    try {
      setLoading(true)
      
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay script not loaded. Please refresh the page and try again.')
      }
      
      // Create order on server
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: product.id,
          amount: product.price * 100 // Convert to paise
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const { order } = await orderResponse.json()

      // Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'T-Shirt Store',
        description: product.name,
        image: '/logo.png', // Add your store logo
        order_id: order.id,
        prefill: {
          name: '[PLACEHOLDER_USER_NAME]', // Replace with actual user data
          email: '[USER_EMAIL]', // Replace with actual user email
          contact: '[PLACEHOLDER_USER_PHONE]', // Replace with actual user phone
        },
        notes: {
          productId: product.id,
          productName: product.name,
        },
        theme: {
          color: '#4F46E5', // Indigo color matching your theme
        },
        handler: async (response) => {
          try {
            // Verify payment on server
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })

            const verifyData = await verifyResponse.json()
            
            if (verifyData.verified) {
              // Payment successful
              window.location.href = `/order/success?orderId=${order.id}&paymentId=${response.razorpay_payment_id}`
            } else {
              // Payment verification failed
              window.location.href = `/order/failure?orderId=${order.id}&error=verification_failed`
            }
          } catch (error) {
            console.error('Verification error:', error)
            window.location.href = `/order/failure?orderId=${order.id}&error=verification_error`
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Checkout closed by user')
            setLoading(false)
          },
        },
      }

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options)
      
      // Handle payment failure
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error)
        window.location.href = `/order/failure?orderId=${order.id}&error=${response.error.code}`
      })

      rzp.open()

    } catch (error) {
      console.error('Buy now error:', error)
      alert('Unable to start payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Razorpay script loaded')
          setRazorpayLoaded(true)
        }}
        onError={() => {
          console.error('Failed to load Razorpay script')
        }}
      />
      <button 
        onClick={handleBuyNow} 
        disabled={loading || !razorpayLoaded}
        className={`${className} ${
          loading || !razorpayLoaded
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {loading ? 'Processing...' : !razorpayLoaded ? 'Loading...' : 'Buy Now'}
      </button>
    </>
  )
}
