import './globals.css'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'

export const metadata = {
  title: 'T-Shirt Store',
  description: 'Premium quality t-shirts for everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
