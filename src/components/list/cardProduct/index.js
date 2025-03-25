import CardProduct from '@/components/card/product'

import styles from './index.module.css'

const ListCardProduct = ({products}) => {
  return (
    <ul className={styles.list}>
      {products.map(({basePrice, brand, id, imageUrl, name}) => {
        return (
          <li key={id}>
            <CardProduct basePrice={basePrice} brand={brand} id={id} imageUrl={imageUrl} name={name} />
          </li>
        )
      })}
    </ul>
  )
}

ListCardProduct.displayName = 'ListCardProduct'

export default ListCardProduct
