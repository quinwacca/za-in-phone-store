import {LocalStorageCartRepository} from '../repositories/localStorageCartRepository'

export class RemoveFromCartUseCase {
  #repository

  static create() {
    return new RemoveFromCartUseCase()
  }

  constructor() {
    this.#repository = LocalStorageCartRepository.create()
  }

  async execute({id, model, selectedCapacity, selectedColor} = {}) {
    return this.#repository.removeFromCart({id, model, selectedCapacity, selectedColor})
  }
}
