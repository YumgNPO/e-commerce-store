import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

export default function Home() {
  // Only get the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ShopGo
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/products" className="font-medium">
              Products
            </Link>
          </nav>
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 bg-white/70 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  Welcome to ShopGo
                </h1>
                <p className="max-w-[700px] text-gray-700 text-sm md:text-base lg:text-xl">
                  Discover our curated collection of premium products
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/products">
                  <Button size="lg" className="font-semibold">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-16 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900">Featured Products</h2>
                <p className="max-w-[700px] text-gray-700 text-sm md:text-base">Check out our most popular items</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-10">
              <Link href="/products">
                <Button variant="outline" size="lg" className="font-medium">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 bg-teal-50">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-gray-600">© 2025 ShopGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

