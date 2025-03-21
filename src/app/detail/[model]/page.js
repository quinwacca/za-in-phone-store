const DetailPage = ({params}) => {
  const {model} = params

  return (
    <div>
      <h1>{model}</h1>
    </div>
  )
}

export default DetailPage
