'use client'

import styles from './index.module.css'

import {useEffect, useState} from 'react'

import {useDebounce} from '@/hooks/useDebounce'

const InputSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedValue = useDebounce({value: searchValue})

  useEffect(() => {
    console.log(debouncedValue) // TO DO: search use case
  }, [debouncedValue])

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={event => setSearchValue(event.target.value)}
        placeholder="Search for a smartphone..."
      />
      <span className={styles.resultsText}>20 results</span>
    </div>
  )
}

InputSearch.displayName = 'InputSearch'

export default InputSearch
