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

describe('addToCartUseCase Test', () => {
  beforeAll(() => localStorage.clear())
  afterAll(() => localStorage.clear())
  afterEach(() => localStorage.removeItem(cartLocalStorageKey))

  it('should return a one product cart when user adds a product on an empty cart', async () => {
    const {addToCartUseCase} = domain

    const [useCaseError, useCaseResponse] = await addToCartUseCase(fixtureSamsung)

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureSamsung])
  })

  it('should return a two product cart when user adds a product on a one product cart', async () => {
    const {addToCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)

    const [useCaseError, useCaseResponse] = await addToCartUseCase(fixtureNokia)

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureSamsung, fixtureNokia])
  })

  it('should return a one product cart when user adds a product that is already in the cart', async () => {
    const {addToCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)

    const [useCaseError, useCaseResponse] = await addToCartUseCase(fixtureSamsung)

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureSamsung])
  })
})
