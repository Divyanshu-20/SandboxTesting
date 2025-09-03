# Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Environment Variables Setup

**In Netlify Dashboard → Site Settings → Environment Variables, add:**

```
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
TSHIRT_PRICE_INR=2999
```

### 2. Build Configuration

**Netlify will automatically detect these settings from `netlify.toml`:**
- Build Command: `npm run build`
- Publish Directory: `.next`
- Node Version: 18

### 3. Webhook Configuration

**After deployment, configure Razorpay webhooks:**

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/app/webhooks)
2. Click "Add New Webhook"
3. **Webhook URL**: `https://your-app-name.netlify.app/api/razorpay/webhook`
4. **Events to Subscribe**:
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ order.paid
5. **Secret**: Use the same secret you set in environment variables

### 4. Testing Checklist

**After deployment, test:**

- [ ] Site loads correctly
- [ ] Product page displays
- [ ] Add to cart works
- [ ] Buy Now button opens Razorpay
- [ ] Test payment completes
- [ ] Success page shows
- [ ] Webhook events received (check Razorpay dashboard)

### 5. Common Issues & Solutions

**Build Fails:**
- Check Node version is 18
- Verify all dependencies are in package.json
- Check for TypeScript errors

**Webhooks Not Working:**
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure HTTPS is enabled
- Check Netlify function logs

**Payment Fails:**
- Verify Razorpay keys are correct
- Check environment variables are set
- Test with sandbox credentials only

### 6. Production Considerations

**Before going live:**
- [ ] Switch to live Razorpay keys
- [ ] Update webhook URL to production domain
- [ ] Add proper error monitoring
- [ ] Implement database for order tracking
- [ ] Add user authentication
- [ ] Set up proper logging

### 7. Monitoring

**Check these regularly:**
- Netlify function logs
- Razorpay webhook delivery logs
- Payment success/failure rates
- Site performance metrics

## 🔗 Useful Links

- [Netlify Dashboard](https://app.netlify.com)
- [Razorpay Dashboard](https://dashboard.razorpay.com)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Razorpay Webhook Docs](https://razorpay.com/docs/webhooks/)
