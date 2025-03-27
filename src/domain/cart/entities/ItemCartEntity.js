export class ItemCartEntity {
  #id
  #model
  #selectedCapacity
  #selectedColor

  static create({id, model, selectedCapacity, selectedColor} = {}) {
    return new ItemCartEntity({id, model, selectedCapacity, selectedColor})
  }

  constructor({id, model, selectedCapacity, selectedColor} = {}) {
    if (!id || !model || !selectedCapacity || !selectedColor) {
      throw new Error('All fields are mandatory: id, model, selectedCapacity, selectedColor')
    }

    this.#id = id
    this.#model = model
    this.#selectedCapacity = selectedCapacity
    this.#selectedColor = selectedColor
  }

  getItem() {
    return {
      id: this.#id,
      model: this.#model,
      selectedCapacity: this.#selectedCapacity,
      selectedColor: this.#selectedColor
    }
  }
}
