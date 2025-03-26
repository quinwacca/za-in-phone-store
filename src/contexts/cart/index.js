'use client'

import {createContext, useContext, useEffect, useState} from 'react'

import {domain} from '@/domain'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const getCart = async () => {
      const [getCartError, getCartResponse] = await domain.getCartUseCase()

      if (getCartError) return

      setCart(getCartResponse)
    }

    getCart()
  }, [])

  const cartSize = cart.length

  const totalPrice = cart.reduce((total, {selectedCapacity: {price}}) => total + price, 0)

  const addToCart = async newProduct => {
    const [addToCartError, addToCartResponse] = await domain.addToCartUseCase(newProduct)

    if (addToCartError) return

    setCart(addToCartResponse)
  }

  const removeFromCart = async removedProduct => {
    const [removeFromCartError, removeFromCartResponse] = await domain.removeFromCartUseCase(removedProduct)

    if (removeFromCartError) return

    setCart(removeFromCartResponse)
  }

  return (
    <CartContext.Provider value={{cart, cartSize, totalPrice, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  return context
}
