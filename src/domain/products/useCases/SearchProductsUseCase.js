import {HttpProductsRepository} from '../repositories/httpProductsRepository'

// had to ask for one more item to avoid React warning about keys
// XMI-RN13P5G appears more than once in the list
// and its filtered on the repository layer
const RESULTS_BY_PAGE = 21

export class SearchProductsUseCase {
  #repository

  static create() {
    return new SearchProductsUseCase()
  }

  constructor() {
    this.#repository = HttpProductsRepository.create()
  }

  #getPageSearchParams({page}) {
    const limit = RESULTS_BY_PAGE
    const offset = (page - 1) * limit
    return {limit, offset}
  }

  async execute({query, page = 1} = {}) {
    const {limit, offset} = this.#getPageSearchParams({page})

    return this.#repository.searchProducts({query, limit, offset})
  }
}
