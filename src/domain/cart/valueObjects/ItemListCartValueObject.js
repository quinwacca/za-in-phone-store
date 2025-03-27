import {ItemCartEntity} from '../entities/ItemCartEntity'

export class ItemListCartValueObject {
  #itemEntityFactory
  #itemList

  static create({items} = {}) {
    return new ItemListCartValueObject({items})
  }

  constructor({items = []} = {}) {
    this.#itemEntityFactory = ItemCartEntity.create

    this.#itemList = items.map(({id, model, selectedCapacity, selectedColor}) =>
      this.#itemEntityFactory({id, model, selectedCapacity, selectedColor})
    )
  }

  getItemList() {
    return this.#itemList.map(item => item.getItem())
  }
}
