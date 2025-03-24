import {HttpProductsRepository} from '../repositories/httpProductsRepository'

const RESULTS_BY_PAGE = 20

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
