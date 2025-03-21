import Image from 'next/image'
import styles from './index.module.css'

const HeaderBasic = () => {
  return (
    <header className={styles.header}>
      <Image className={styles.logo} src="/mbst-logo.svg" alt="MBST logo" width={74} height={29} priority />
    </header>
  )
}

HeaderBasic.displayName = 'HeaderBasic'

export default HeaderBasic
