import Razorpay from 'razorpay'

export async function POST(req) {
  try {
    const { productId, amount } = await req.json()
    
    // Validate inputs
    if (!productId) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Use server-side price validation (amount in paise)
    const amountInPaise = parseInt(process.env.TSHIRT_PRICE_INR || '2999') * 100
    
    // Initialize Razorpay
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // Create order
    const order = await rzp.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${productId}`,
      notes: { 
        productId: productId,
        productName: 'Premium Cotton T-Shirt',
        timestamp: new Date().toISOString()
      },
    })

    console.log('Order created:', order.id, 'Amount:', amountInPaise)

    return new Response(JSON.stringify({ 
      order,
      amount: amountInPaise,
      currency: 'INR'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Create order error:', err)
    return new Response(JSON.stringify({ 
      error: 'Unable to create order',
      details: err.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
