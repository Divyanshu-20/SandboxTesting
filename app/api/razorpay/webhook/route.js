import crypto from 'crypto'

export async function POST(req) {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      console.warn('Missing Razorpay signature header')
      return new Response('Missing signature', { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex')

    if (expectedSignature !== signature) {
      console.warn('Invalid webhook signature')
      return new Response('Invalid signature', { status: 400 })
    }

    // Parse webhook event
    const event = JSON.parse(rawBody)
    
    console.log('Webhook received:', {
      event: event.event,
      orderId: event.payload?.order?.entity?.id,
      paymentId: event.payload?.payment?.entity?.id,
      timestamp: new Date().toISOString()
    })

    // Handle different webhook events
    switch (event.event) {
      case 'payment.authorized':
        console.log('Payment authorized:', event.payload?.payment?.entity?.id)
        // TODO: Update order status to authorized
        // await updateOrderStatus(event.payload.order.entity.id, 'authorized')
        break

      case 'payment.captured':
        console.log('Payment captured:', event.payload?.payment?.entity?.id)
        // TODO: Update order status to captured/paid
        // await updateOrderStatus(event.payload.order.entity.id, 'paid')
        break

      case 'order.paid':
        console.log('Order paid:', event.payload?.order?.entity?.id)
        // TODO: Update order status to paid
        // await updateOrderStatus(event.payload.order.entity.id, 'paid')
        break

      case 'payment.failed':
        console.log('Payment failed:', event.payload?.payment?.entity?.id)
        // TODO: Update order status to failed
        // await updateOrderStatus(event.payload.order.entity.id, 'failed')
        break

      default:
        console.log('Unhandled webhook event:', event.event)
    }

    // TODO: Implement idempotency check using event ID
    // const eventId = event.event_id
    // if (await isEventProcessed(eventId)) {
    //   console.log('Event already processed:', eventId)
    //   return new Response('Event already processed', { status: 200 })
    // }
    // await markEventProcessed(eventId)

    return new Response('ok', { status: 200 })

  } catch (err) {
    console.error('Webhook error:', err)
    return new Response('Webhook processing failed', { status: 500 })
  }
}
