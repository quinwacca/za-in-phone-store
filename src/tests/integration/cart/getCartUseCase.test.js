import {describe, it, expect, afterAll, afterEach, beforeAll} from 'vitest'

import {domain} from '@/domain'

const cartLocalStorageKey = 'cart'

const fixtureSamsung = {
  id: 'SMG-S24U',
  model: 'Galaxy S24 Ultra',
  selectedColor: {
    name: 'Titanium Violet',
    hexCode: '#8E6F96',
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
  },
  selectedCapacity: {
    capacity: '256 GB',
    price: 1229
  }
}
const fixtureNokia = {
  id: 'NOK-3310',
  model: 'Nokia 3310',
  selectedColor: {
    name: 'Blue',
    hexCode: '#0000FF',
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/NOK-3310-blue.webp'
  },
  selectedCapacity: {
    capacity: '4 GB',
    price: 49
  }
}

describe('getCartUseCase Test', () => {
  beforeAll(() => localStorage.clear())
  afterAll(() => localStorage.clear())
  afterEach(() => localStorage.removeItem(cartLocalStorageKey))

  it('if there is one product, should return a one product cart', async () => {
    const {addToCartUseCase, getCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)

    const [useCaseError, useCaseResponse] = await getCartUseCase()

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureSamsung])
  })

  it('if there is two products, should return a two products cart', async () => {
    const {addToCartUseCase, getCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)
    await addToCartUseCase(fixtureNokia)

    const [useCaseError, useCaseResponse] = await getCartUseCase()

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureSamsung, fixtureNokia])
  })

  it('if there is no local storage cart key, should return an empty cart', async () => {
    const {getCartUseCase} = domain

    const [useCaseError, useCaseResponse] = await getCartUseCase()

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([])
  })

  it('if there is local storage cart key, but with no products, should return an empty cart', async () => {
    const {addToCartUseCase, getCartUseCase, removeFromCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)
    await removeFromCartUseCase(fixtureSamsung)

    const [useCaseError, useCaseResponse] = await getCartUseCase()

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([])
  })
})
