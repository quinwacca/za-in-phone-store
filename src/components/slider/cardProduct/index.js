import CardProduct from '@/components/card/product'

import styles from './index.module.css'

const SliderCardProduct = ({products}) => {
  return (
    <div className={styles.slider}>
      <ul className={styles.list}>
        {products.map(({basePrice, brand, id, imageUrl, name}) => {
          return (
            <li key={id} className={styles.item}>
              <CardProduct basePrice={basePrice} brand={brand} id={id} imageUrl={imageUrl} name={name} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SliderCardProduct.displayName = 'SliderCardProduct'

export default SliderCardProduct
