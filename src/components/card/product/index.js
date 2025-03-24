import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.css'

const CardProduct = ({basePrice, brand, imageUrl, name}) => {
  //  TO DO: add product page link with id

  return (
    <Link className={styles.link} href="#">
      <article className={styles.card}>
        <Image className={styles.image} src={imageUrl} alt={`${brand} ${name} image`} width={310} height={257} />
        <div className={styles.info}>
          <div className={styles.infoText}>
            <h3 className={styles.infoBrand}>{`${brand}`}</h3>
            <h2 className={styles.infoName}>{`${name}`}</h2>
          </div>
          <p className={styles.infoPrice}>{`${basePrice} EUR`}</p>
        </div>
      </article>
    </Link>
  )
}

CardProduct.displayName = 'CardProduct'

export default CardProduct
