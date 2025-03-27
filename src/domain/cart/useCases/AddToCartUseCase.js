import {LocalStorageCartRepository} from '../repositories/localStorageCartRepository'

import {ItemCartEntity} from '../entities/ItemCartEntity'

export class AddToCartUseCase {
  #itemEntityFactory
  #repository

  static create() {
    return new AddToCartUseCase()
  }

  constructor() {
    this.#itemEntityFactory = ItemCartEntity.create
    this.#repository = LocalStorageCartRepository.create()
  }

  async execute({id, model, selectedCapacity, selectedColor} = {}) {
    const itemEntity = this.#itemEntityFactory({id, model, selectedCapacity, selectedColor})

    const itemListValueObject = await this.#repository.addToCart({itemEntity})

    return itemListValueObject.getItemList()
  }
}
