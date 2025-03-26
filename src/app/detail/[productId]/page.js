import {domain} from '@/domain'
import ListSpecs from '@/components/list/specs'
import PanelBuyProduct from '@/components/panel/buyProduct'

import styles from './detailPage.module.css'

const DetailPage = async ({params}) => {
  const {productId} = await params
  const [getProductError, product = {}] = await domain.getProductUseCase({id: productId})

  if (Boolean(getProductError)) return <h2>{`Oops! Something went wrong!`}</h2>

  const {brand, description, name, specs} = product

  return (
    <div className={styles.detailWrapper}>
      <PanelBuyProduct product={product} />
      <div className={styles.listSpecs}>
        <ListSpecs {...{brand, description, name, ...specs}} />
      </div>
    </div>
  )
}

DetailPage.displayName = 'DetailPage'

export default DetailPage
