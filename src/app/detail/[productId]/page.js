import {domain} from '@/domain'

import ListSpecs from '@/components/list/specs'

import styles from './detailPage.module.css'

const DetailPage = async ({params}) => {
  const {productId} = await params
  const [getProductError, getProductResponse = {}] = await domain.getProductUseCase({id: productId})

  if (Boolean(getProductError)) return <h2>{`Oops! Something went wrong!`}</h2>

  const {brand, description, name, specs} = getProductResponse

  return (
    <div className={styles.detailWrapper}>
      <ListSpecs {...{brand, description, name, ...specs}} />
    </div>
  )
}

DetailPage.displayName = 'DetailPage'

export default DetailPage
