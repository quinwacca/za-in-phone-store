import {ApiFetcher} from '@/domain/fetcher/ApiFetcher'

export class HttpProductsRepository {
  #fetcher
  #productsApiUrl

  static create() {
    return new HttpProductsRepository()
  }

  constructor() {
    this.#fetcher = ApiFetcher.create()
    this.#productsApiUrl = '/products'
  }

  async getProduct({id} = {}) {
    const apiUrl = `${this.#productsApiUrl}/${id}`

    return this.#fetcher.get(apiUrl).then(res => {
      if (res.status !== 200) {
        throw new Error('Product not found')
      }

      return res.json()
    })
  }

  async searchProducts({query, limit, offset} = {}) {
    const urlSearchParams = new URLSearchParams(`?limit=${limit}&offset=${offset}`)
    if (query !== undefined) urlSearchParams.append('search', query)

    const apiUrl = `${this.#productsApiUrl}?${urlSearchParams.toString()}`

    return this.#fetcher
      .get(apiUrl)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Product not found')
        }

        return res.json()
      })
      .then(products => {
        // had to remove duplicates to avoid React warning about keys
        // XMI-RN13P5G appears more than once in the list
        return Array.from(new Set(products.map(product => product.id))).map(id =>
          products.find(product => product.id === id)
        )
      })
  }
}
