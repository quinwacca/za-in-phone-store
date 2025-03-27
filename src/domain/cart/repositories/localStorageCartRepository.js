import {ItemListCartValueObject} from '../valueObjects/ItemListCartValueObject'

export class LocalStorageCartRepository {
  #cartLocalStorageKey
  #getCart
  #getLocalStorageItem
  #itemListValueObjectFactory
  #localStorage
  #setLocalStorageItem

  static create() {
    return new LocalStorageCartRepository()
  }

  constructor() {
    this.#cartLocalStorageKey = 'cart'
    this.#localStorage = localStorage
    this.#getLocalStorageItem = this.#localStorage.getItem.bind(this.#localStorage)
    this.#setLocalStorageItem = this.#localStorage.setItem.bind(this.#localStorage)
    this.#getCart = () => JSON.parse(this.#getLocalStorageItem(this.#cartLocalStorageKey)) || []
    this.#itemListValueObjectFactory = ItemListCartValueObject.create
  }

  async addToCart({itemEntity} = {}) {
    const itemToAdd = itemEntity.getItem()
    const {id, model, selectedCapacity, selectedColor} = itemToAdd
    const currentCart = this.#getCart()

    const isProductInCart = currentCart.some(
      ({id: currentProduct, selectedCapacity: {capacity: currentCapacity}, selectedColor: {name: currentColor}}) =>
        currentProduct === id && currentCapacity === selectedCapacity.capacity && currentColor === selectedColor.name
    )

    if (isProductInCart) return this.#itemListValueObjectFactory({items: currentCart})

    this.#setLocalStorageItem(
      this.#cartLocalStorageKey,
      JSON.stringify([...currentCart, {id, model, selectedCapacity, selectedColor}])
    )

    return this.#itemListValueObjectFactory({items: this.#getCart()})
  }

  async getCart() {
    return this.#itemListValueObjectFactory({items: this.#getCart()})
  }

  async removeFromCart({itemEntity} = {}) {
    const itemToRemove = itemEntity.getItem()
    const {id, selectedCapacity, selectedColor} = itemToRemove
    const currentCart = this.#getCart()

    const cartWithoutRemovedProduct = currentCart.filter(
      ({id: currentProduct, selectedCapacity: {capacity: currentCapacity}, selectedColor: {name: currentColor}}) =>
        !(currentProduct === id && currentCapacity === selectedCapacity.capacity && currentColor === selectedColor.name)
    )

    this.#setLocalStorageItem(this.#cartLocalStorageKey, JSON.stringify(cartWithoutRemovedProduct))

    return this.#itemListValueObjectFactory({items: this.#getCart()})
  }
}
