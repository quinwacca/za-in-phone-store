import './globals.css'
import styles from './layout.module.css'

import HeaderBasic from '@/components/header/basic'
import LayoutContainer from '@/components/layout/container'

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className={styles.layout}>
        <HeaderBasic />
        <LayoutContainer>{children}</LayoutContainer>
      </body>
    </html>
  )
}

export default RootLayout

export const metadata = {
  title: 'MBST - A Zara Challenge by Luis Garrido',
  description: 'MBST - A Zara Challenge by Luis Garrido, built with Next.js'
}
