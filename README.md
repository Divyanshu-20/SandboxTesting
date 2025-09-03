# T-Shirt Store with Razorpay Integration

A modern Next.js e-commerce application for selling premium T-shirts with integrated Razorpay payment processing.

## 🚀 Features

- **Modern UI**: Built with Next.js 14 and Tailwind CSS
- **Shopping Cart**: Add/remove items, quantity management
- **Payment Integration**: Razorpay sandbox payments
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Cart state management with React Context

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Payment**: Razorpay
- **State Management**: React Context API
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd razorpay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Add your Razorpay sandbox credentials to `.env.local`:
   ```env
   RAZORPAY_KEY_ID=your_sandbox_key_id
   RAZORPAY_KEY_SECRET=your_sandbox_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_sandbox_key_id
   TSHIRT_PRICE_INR=2999
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment to Netlify

### 1. Environment Variables in Netlify

Add these environment variables in your Netlify dashboard:

```
RAZORPAY_KEY_ID=your_sandbox_key_id
RAZORPAY_KEY_SECRET=your_sandbox_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_sandbox_key_id
TSHIRT_PRICE_INR=2999
```

### 2. Build Settings

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18

### 3. Webhook Configuration

After deployment, configure Razorpay webhooks:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/app/webhooks)
2. Add webhook URL: `https://your-app-name.netlify.app/api/razorpay/webhook`
3. Select events:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `order.paid`

## 🧪 Testing

### Test Cards (Sandbox)
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### Test UPI
- **UPI ID**: success@razorpay

## 📁 Project Structure

```
├── app/
│   ├── api/razorpay/          # Payment API routes
│   │   ├── order/             # Order creation
│   │   ├── verify/            # Payment verification
│   │   └── webhook/           # Webhook handler
│   ├── components/            # React components
│   │   ├── Header.js          # Navigation header
│   │   ├── CartIcon.js        # Cart icon with count
│   │   └── BuyNowButton.js    # Payment button
│   ├── context/               # React Context
│   │   └── CartContext.js     # Cart state management
│   ├── order/                 # Order pages
│   │   ├── success/           # Payment success
│   │   └── failure/           # Payment failure
│   ├── product/               # Product page
│   ├── cart/                  # Shopping cart
│   ├── layout.js              # Root layout
│   └── page.js                # Homepage
├── public/                    # Static assets
├── netlify.toml              # Netlify configuration
└── next.config.js            # Next.js configuration
```

## 🔧 API Endpoints

- `POST /api/razorpay/order` - Create payment order
- `POST /api/razorpay/verify` - Verify payment signature
- `POST /api/razorpay/webhook` - Handle webhook events

## 🛡️ Security Features

- Server-side price validation
- Payment signature verification
- Webhook signature validation
- Environment variable protection
- Input validation on all endpoints

## 🚀 Getting Started

1. **Set up Razorpay account**
   - Create account at [Razorpay](https://razorpay.com)
   - Get sandbox credentials
   - Configure webhook endpoint

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

3. **Test payment flow**
   - Visit your deployed site
   - Add items to cart
   - Complete test payment
   - Verify webhook events

## 📝 Notes

- This is a sandbox implementation for testing
- Replace placeholder values with actual user data
- Add database integration for production use
- Implement proper error handling and logging
- Add CSRF protection for enhanced security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
