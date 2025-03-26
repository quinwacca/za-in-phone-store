import {LocalStorageCartRepository} from '../repositories/localStorageCartRepository'

export class AddToCartUseCase {
  #repository

  static create() {
    return new AddToCartUseCase()
  }

  constructor() {
    this.#repository = LocalStorageCartRepository.create()
  }

  async execute({id, model, selectedCapacity, selectedColor} = {}) {
    return this.#repository.addToCart({id, model, selectedCapacity, selectedColor})
  }
}
