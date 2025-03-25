import {domain} from '@/domain'

const DetailPage = async ({params}) => {
  const {productId} = params
  const [searchProductsError, searchProductsResponse = {}] = await domain.getProductUseCase({id: productId})

  return (
    <div>
      <h1>{productId}</h1>
      {Boolean(searchProductsError) ? (
        <h2>{`Oops! Something went wrong!`}</h2>
      ) : (
        <>
          <h1>{searchProductsResponse.brand}</h1>
          <h1>{searchProductsResponse.name}</h1>
        </>
      )}
    </div>
  )
}

DetailPage.displayName = 'DetailPage'

export default DetailPage
