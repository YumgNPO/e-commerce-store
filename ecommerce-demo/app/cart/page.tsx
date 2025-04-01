"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a loading state until the component is mounted
  if (!mounted) {
    return (
      <div className="container py-6 md:py-12 bg-gradient-to-b from-orange-50 to-white min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 bg-white/70 inline-block px-4 py-2 rounded-md">
          Your Cart
        </h1>
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container py-6 md:py-12 bg-gradient-to-b from-orange-50 to-white min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 bg-white/70 inline-block px-4 py-2 rounded-md">
          Your Cart
        </h1>
        <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center bg-white rounded-lg shadow-sm p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="container py-6 md:py-12 bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 bg-white/70 inline-block px-4 py-2 rounded-md">
        Your Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg divide-y bg-white shadow-sm">
            {cart.map((item) => (
              <div key={item.id} className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden flex-shrink-0 border border-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-medium hover:underline text-gray-900 text-sm md:text-base truncate"
                    >
                      {item.name}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center mt-auto pt-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-6 md:w-8 text-center text-xs md:text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                    <div className="ml-auto font-medium text-gray-900 text-sm md:text-base">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="border rounded-lg p-4 md:p-6 space-y-4 md:space-y-6 sticky top-20 bg-white shadow-sm">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between text-gray-700 text-sm md:text-base">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-sm md:text-base">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 md:pt-4 flex justify-between font-semibold text-gray-900 text-sm md:text-base">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg">
              Checkout
            </Button>
            <div className="text-center text-xs md:text-sm text-gray-500">
              <p>Taxes calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

