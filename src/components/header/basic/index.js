import Link from 'next/link'

import Image from 'next/image'
import styles from './index.module.css'

const HeaderBasic = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src="/mbst-logo.svg" alt="MBST logo" width={74} height={29} priority />
      </Link>
    </header>
  )
}

HeaderBasic.displayName = 'HeaderBasic'

export default HeaderBasic
