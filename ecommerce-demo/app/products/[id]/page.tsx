import Image from "next/image"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/add-to-cart-button"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-6 md:py-12 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col space-y-4 md:space-y-6 bg-white/80 p-4 md:p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl md:text-2xl font-semibold mt-2 text-gray-800">{formatPrice(product.price)}</p>
          </div>
          <div className="prose max-w-none text-gray-700 text-sm md:text-base">
            <p>{product.description}</p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

