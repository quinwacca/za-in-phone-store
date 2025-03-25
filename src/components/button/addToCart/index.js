import styles from './index.module.css'

import ButtonBasic from '@/components/button/basic'

const ButtonAddToCart = ({productId, selectedCapacity, selectedColor}) => {
  return (
    <div className={styles.buttonWrapper}>
      <ButtonBasic
        disabled={!Boolean(selectedCapacity) || !Boolean(selectedColor)}
        onClick={() => console.log({productId})}
      >
        Add to cart
      </ButtonBasic>
    </div>
  )
}

ButtonAddToCart.displayName = 'ButtonAddToCart'

export default ButtonAddToCart
