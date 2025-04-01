"use client"

import { useState, useCallback } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = useCallback(() => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }, [addToCart, product])

  return (
    <Button onClick={handleAddToCart} className="w-full md:w-auto" disabled={isAdding} size="lg">
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Added to Cart!" : "Add to Cart"}
    </Button>
  )
}

