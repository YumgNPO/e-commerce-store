import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </div>
      <div className="mt-2 md:mt-4 space-y-1 p-1 md:p-2">
        <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-700">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

