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

describe('removeFromCartUseCase Test', () => {
  beforeAll(() => localStorage.clear())
  afterAll(() => localStorage.clear())
  afterEach(() => localStorage.removeItem(cartLocalStorageKey))

  it('should return a one product cart when user removes a product from a two products cart', async () => {
    const {addToCartUseCase, removeFromCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)
    await addToCartUseCase(fixtureNokia)

    const [useCaseError, useCaseResponse] = await removeFromCartUseCase(fixtureSamsung)

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([fixtureNokia])
  })

  it('should return an empty cart when user removes a product on a one product cart', async () => {
    const {addToCartUseCase, removeFromCartUseCase} = domain

    await addToCartUseCase(fixtureSamsung)

    const [useCaseError, useCaseResponse] = await removeFromCartUseCase(fixtureSamsung)

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual([])
  })
})
