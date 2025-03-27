import {domain} from '@/domain'

import ListSpecs from '@/components/list/specs'
import PanelBuyProduct from '@/components/panel/buyProduct'
import SliderCardProduct from '@/components/slider/cardProduct'

import styles from './detailPage.module.css'

const DetailPage = async ({params}) => {
  const {productId} = await params
  const [getProductError, product = {}] = await domain.getProductUseCase({id: productId})

  if (Boolean(getProductError)) return <h2>{`Oops! Something went wrong!`}</h2>

  const {brand, description, name, similarProducts, specs} = product

  return (
    <div className={styles.detailWrapper}>
      <PanelBuyProduct product={product} />
      <ListSpecs {...{brand, description, name, ...specs}} />
      <SliderCardProduct products={similarProducts} />
    </div>
  )
}

DetailPage.displayName = 'DetailPage'

export default DetailPage
