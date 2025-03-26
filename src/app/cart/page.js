'use client'

import {useCart} from '@/contexts/cart'

const CartPage = () => {
  const {cart, cartSize, removeFromCart} = useCart()

  return (
    <div>
      <h1>Cart ({cartSize.toString()})</h1>
      {cart.map(({id, model, selectedCapacity, selectedColor}) => (
        <div key={`${id}-${selectedCapacity.capacity}-${selectedColor.name}`}>
          <h2>{model}</h2>
          <p>Color: {selectedColor.name}</p>
          <p>Capacity: {selectedCapacity.capacity}</p>
          <button onClick={() => removeFromCart({id, model, selectedCapacity, selectedColor})}>Remove from cart</button>
        </div>
      ))}
    </div>
  )
}

CartPage.displayName = 'CartPage'

export default CartPage
