export class LocalStorageCartRepository {
  #cartLocalStorageKey
  #getCart
  #getLocalStorageItem
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
  }

  async addToCart({id, model, selectedCapacity, selectedColor} = {}) {
    const currentCart = this.#getCart()
    const isProductInCart = currentCart.some(
      ({id: currentProduct, selectedCapacity: {capacity: currentCapacity}, selectedColor: {name: currentColor}}) =>
        currentProduct === id && currentCapacity === selectedCapacity.capacity && currentColor === selectedColor.name
    )

    if (isProductInCart) return currentCart

    this.#setLocalStorageItem(
      this.#cartLocalStorageKey,
      JSON.stringify([...currentCart, {id, model, selectedCapacity, selectedColor}])
    )

    return this.#getCart()
  }

  async getCart() {
    return this.#getCart()
  }

  async removeFromCart({id, selectedCapacity, selectedColor} = {}) {
    const currentCart = this.#getCart()
    const cartWithoutRemovedProduct = currentCart.filter(
      ({id: currentProduct, selectedCapacity: {capacity: currentCapacity}, selectedColor: {name: currentColor}}) =>
        !(currentProduct === id && currentCapacity === selectedCapacity.capacity && currentColor === selectedColor.name)
    )

    this.#setLocalStorageItem(this.#cartLocalStorageKey, JSON.stringify(cartWithoutRemovedProduct))

    return this.#getCart()
  }
}
