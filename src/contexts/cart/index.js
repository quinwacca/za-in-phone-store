'use client'

import {createContext, useContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([])

  const cartSize = cart.length

  const totalPrice = cart.reduce((total, {selectedCapacity: {price}}) => total + price, 0)

  const addToCart = newProduct => {
    setCart(previousCart => {
      const isProductInCart = previousCart.some(
        ({id, selectedCapacity, selectedColor}) =>
          id === newProduct.id &&
          selectedCapacity.capacity === newProduct.selectedCapacity.capacity &&
          selectedColor.name === newProduct.selectedColor.name
      )

      return isProductInCart ? [...previousCart] : [...previousCart, newProduct]
    })
  }

  const removeFromCart = removedProduct => {
    setCart(previousCart => {
      const cartWithoutRemovedProduct = previousCart.filter(
        ({id, selectedCapacity, selectedColor}) =>
          !(
            id === removedProduct.id &&
            selectedCapacity.capacity === removedProduct.selectedCapacity.capacity &&
            selectedColor.name === removedProduct.selectedColor.name
          )
      )

      return cartWithoutRemovedProduct
    })
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
