import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

export default function ProductsPage() {
  return (
    <div className="container py-6 md:py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 bg-white/70 inline-block px-4 py-2 rounded-md">
        All Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

