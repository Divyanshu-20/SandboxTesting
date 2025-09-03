import crypto from 'crypto'

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ 
        error: 'Missing required payment verification fields' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Create signature body
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    
    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    // Verify signature
    const verified = expectedSignature === razorpay_signature

    console.log('Payment verification:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      verified: verified,
      timestamp: new Date().toISOString()
    })

    // TODO: Update order status in database
    if (verified) {
      // Update order as paid in your database
      console.log('Order verified successfully:', razorpay_order_id)
      // await updateOrderStatus(razorpay_order_id, 'paid', razorpay_payment_id)
    } else {
      console.warn('Payment verification failed for order:', razorpay_order_id)
      // await updateOrderStatus(razorpay_order_id, 'verification_failed')
    }

    return new Response(JSON.stringify({ 
      verified,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    }), { 
      status: verified ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Verify payment error:', err)
    return new Response(JSON.stringify({ 
      error: 'Payment verification failed',
      details: err.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
