'use client'

import styles from './index.module.css'

import {useEffect, useState} from 'react'

import {useDebounce} from '@/hooks/useDebounce'

const InputSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedValue = useDebounce({value: searchValue})

  useEffect(() => {
    if (debouncedValue !== '') console.log('searching...', debouncedValue)
    // TO DO: search use case
  }, [debouncedValue])

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
