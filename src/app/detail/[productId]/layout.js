import NavigationBack from '@/components/navigation/back'

const DetailPageLayout = ({children}) => {
  return (
    <>
      <NavigationBack />
      {children}
    </>
  )
}

export default DetailPageLayout

export const generateMetadata = async ({params}) => {
  const {productId} = await params

  return {
    title: `${productId} - MBST - A Zara Challenge by Luis Garrido`,
    description: `${productId} - MBST - A Zara Challenge by Luis Garrido, built with Next.js`
  }
}
