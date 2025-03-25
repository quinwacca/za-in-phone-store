const DetailPage = ({params}) => {
  const {productId} = params

  return (
    <div>
      <h1>{productId}</h1>
    </div>
  )
}

export default DetailPage
