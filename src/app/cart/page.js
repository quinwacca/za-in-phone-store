'use client'

import {useCart} from '@/contexts/cart'
import ButtonBasic, {buttonBasicDesigns, buttonBasicTypes} from '@/components/button/basic'

import styles from './cartPage.module.css'

const CartPage = () => {
  const {cart, cartSize, totalPrice, removeFromCart} = useCart()

  const areProductsInCart = cartSize > 0

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.counter}>Cart ({cartSize.toString()})</h1>
        {cart.map(({id, model, selectedCapacity, selectedColor}) => (
          <div key={`${id}-${selectedCapacity.capacity}-${selectedColor.name}`}>
            <h2>{model}</h2>
            <p>Color: {selectedColor.name}</p>
            <p>Capacity: {selectedCapacity.capacity}</p>
            <p>Price: {selectedCapacity.price}</p>
            <button onClick={() => removeFromCart({id, model, selectedCapacity, selectedColor})}>
              Remove from cart
            </button>
          </div>
        ))}
      </div>

      {areProductsInCart ? (
        <div className={styles.fullCart}>
          <div className={styles.total}>
            <span>Total</span> <span>{`${totalPrice} EUR`}</span>
          </div>
          <div className={styles.continueShopping}>
            <ButtonBasic href="/" design={buttonBasicDesigns.OUTLINE} type={buttonBasicTypes.LINK}>
              Continue shopping
            </ButtonBasic>
          </div>
          <div className={styles.pay}>
            <ButtonBasic>Pay</ButtonBasic>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <ButtonBasic href="/" design={buttonBasicDesigns.OUTLINE} type={buttonBasicTypes.LINK}>
            Continue shopping
          </ButtonBasic>
        </div>
      )}
    </div>
  )
}

CartPage.displayName = 'CartPage'

export default CartPage
