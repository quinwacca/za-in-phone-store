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

  async searchProducts({query, limit, offset} = {}) {
    const urlSearchParams = new URLSearchParams(`?limit=${limit}&offset=${offset}`)
    if (query !== undefined) urlSearchParams.append('search', query)

    const apiUrl = `${this.#productsApiUrl}?${urlSearchParams.toString()}`

    return this.#fetcher.get(apiUrl).then(res => res.json())
  }
}
