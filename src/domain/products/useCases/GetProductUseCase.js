import {HttpProductsRepository} from '../repositories/httpProductsRepository'

export class GetProductUseCase {
  #repository

  static create() {
    return new GetProductUseCase()
  }

  constructor() {
    this.#repository = HttpProductsRepository.create()
  }

  async execute({id} = {}) {
    return this.#repository.getProduct({id})
  }
}
