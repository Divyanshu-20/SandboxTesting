import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              T-Shirt Store
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              href="/product" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Product
            </Link>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  )
}
