import InputSearch from '@/components/input/search'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <InputSearch />
      <div>
        <h2>Phones List</h2>
      </div>
    </div>
  )
}
