import {LocalStorageCartRepository} from '../repositories/localStorageCartRepository'

export class GetCartUseCase {
  #repository

  static create() {
    return new GetCartUseCase()
  }

  constructor() {
    this.#repository = LocalStorageCartRepository.create()
  }

  async execute() {
    return this.#repository.getCart()
  }
}
