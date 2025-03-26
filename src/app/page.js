import {domain} from '@/domain'

import InputSearch from '@/components/input/search'
import ListCardProduct from '@/components/list/cardProduct'

import styles from './page.module.css'

const HomePage = async ({searchParams}) => {
  const searchValue = (await searchParams).search
  const [searchProductsError, searchProductsResponse = []] = await domain.searchProductsUseCase({query: searchValue})

  if (Boolean(searchProductsError)) return <h2>{`Oops! Something went wrong!`}</h2>

  // had to remove duplicates to avoid React warning about keys
  // XMI-RN13P5G appears more than once in the list
  const products = Array.from(new Set(searchProductsResponse.map(product => product.id))).map(id =>
    searchProductsResponse.find(product => product.id === id)
  )

  return (
    <div className={styles.page}>
      <div className={styles.searchWrapper}>
        <InputSearch />
        <span className={styles.resultsText}>{`${products?.length ?? '0'} results`}</span>
      </div>
      <div>
        <ListCardProduct products={products} />
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
