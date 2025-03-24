import {domain} from '@/domain'

import InputSearch from '@/components/input/search'
import styles from './page.module.css'

const HomePage = async ({searchParams}) => {
  const searchValue = (await searchParams).search
  const [searchProductsError, searchProductsResponse] = await domain.searchProductsUseCase({search: searchValue})

  // had to remove duplicates to avoid React warning about keys
  const products = Array.from(new Set(searchProductsResponse.map(product => product.id))).map(id =>
    searchProductsResponse.find(product => product.id === id)
  ) // XMI-RN13P5G appears more than once in the list

  return (
    <div className={styles.page}>
      <InputSearch />
      <div>
        <h2>Phones List</h2>
        {searchProductsError && <p>{`Oops! Something went wrong!`}</p>}
        <ul>
          {products.map(product => {
            return <li key={product.id}>{`${product.brand} - ${product.name}`}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
