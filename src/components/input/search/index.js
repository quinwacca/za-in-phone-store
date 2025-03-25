'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'

import {useDebounce} from '@/hooks/useDebounce'

import styles from './index.module.css'

const InputSearch = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState()

  const debouncedValue = useDebounce({value: searchValue})

  useEffect(() => {
    if (debouncedValue === undefined) {
      return
    }

    if (debouncedValue === '') {
      router.push(`/`)
      return
    }

    router.push(`/?search=${debouncedValue}`)
  }, [debouncedValue, router])

  const handleFormSubmit = event => {
    event.preventDefault()
  }

  return (
    <form role="search" onSubmit={handleFormSubmit}>
      <input
        aria-label="Search for a smartphone"
        className={styles.input}
        name="search"
        onChange={event => setSearchValue(event.target.value)}
        placeholder="Search for a smartphone..."
        spellCheck="false"
        type="search"
      />
    </form>
  )
}

InputSearch.displayName = 'InputSearch'

export default InputSearch
