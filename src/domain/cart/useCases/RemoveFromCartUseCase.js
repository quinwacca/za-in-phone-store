import {LocalStorageCartRepository} from '../repositories/localStorageCartRepository'

import {ItemCartEntity} from '../entities/ItemCartEntity'

export class RemoveFromCartUseCase {
  #itemEntityFactory
  #repository

  static create() {
    return new RemoveFromCartUseCase()
  }

  constructor() {
    this.#itemEntityFactory = ItemCartEntity.create
    this.#repository = LocalStorageCartRepository.create()
  }

  async execute({id, model, selectedCapacity, selectedColor} = {}) {
    const itemEntity = this.#itemEntityFactory({id, model, selectedCapacity, selectedColor})

    const itemListValueObject = await this.#repository.removeFromCart({itemEntity})

    return itemListValueObject.getItemList()
  }
}
