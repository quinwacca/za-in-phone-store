import {describe, it, expect} from 'vitest'
import {setupServer} from 'msw/node'
import {domain} from '@/domain'
import {afterAll, afterEach, beforeAll} from 'vitest'
import {http, HttpResponse} from 'msw'

const fixture = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
  },
  {
    id: 'SMG-A25',
    brand: 'Samsung',
    name: 'Galaxy A25 5G',
    basePrice: 239,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp'
  },
  {
    id: 'GPX-8A',
    brand: 'Google',
    name: 'Pixel 8a',
    basePrice: 459,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp'
  },
  {
    id: 'APL-I15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    basePrice: 1319,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-negro.webp'
  },
  {
    id: 'OPP-A18',
    brand: 'OPPO',
    name: 'A18',
    basePrice: 99,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-A18-azul-brillante.webp'
  },
  {
    id: 'XMI-RN13P5G',
    brand: 'Xiaomi',
    name: 'Redmi Note 13 Pro 5G',
    basePrice: 399,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-RN13P5G-midnight-black.webp'
  },
  {
    id: 'XMI-RN13P5G',
    brand: 'Xiaomi',
    name: 'Redmi Note 13 Pro 5G',
    basePrice: 399,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-RN13P5G-midnight-black.webp'
  },
  {
    id: 'APL-IP13-128',
    brand: 'Apple',
    name: 'iPhone 13',
    basePrice: 619,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.webp'
  },
  {
    id: 'OPP-R11F',
    brand: 'OPPO',
    name: 'Reno 11 F',
    basePrice: 269,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-R11F-verde.webp'
  },
  {
    id: 'XIA-RN13',
    brand: 'Xiaomi',
    name: 'Redmi Note 13',
    basePrice: 169,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XIA-RN13-mint-green.webp'
  }
]

const fixtureSearchSamsung = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
  },
  {
    id: 'SMG-A25',
    brand: 'Samsung',
    name: 'Galaxy A25 5G',
    basePrice: 239,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp'
  }
]

const fixtureEmptyResults = []

const handlers = [
  http.get('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', ({request}) => {
    const {searchParams} = new URL(request.url)
    const search = searchParams.get('search')

    if (search === 'nokia') return HttpResponse.json(fixtureEmptyResults)
    if (search === 'samsung') return HttpResponse.json(fixtureSearchSamsung)

    return HttpResponse.json(fixture)
  })
]

const server = setupServer(...handlers)

describe('searchProductsUseCase Test', () => {
  beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())

  it('should return a list of products with no filters applied, filtering duplicates', async () => {
    const {searchProductsUseCase} = domain

    const [useCaseError, useCaseResponse] = await searchProductsUseCase()

    const filteredFixture = Array.from(new Set(fixture.map(product => product.id))).map(id =>
      fixture.find(product => product.id === id)
    )

    expect(useCaseError).toBeNull()
    expect(useCaseResponse.length).toBe(9)
    expect(useCaseResponse).toStrictEqual(filteredFixture)
  })

  it('should return a list of products filtered by limit and search string', async () => {
    const {searchProductsUseCase} = domain

    const [useCaseError, useCaseResponse] = await searchProductsUseCase({query: 'samsung'})

    expect(useCaseError).toBeNull()
    expect(useCaseResponse.length).toBe(2)
    expect(useCaseResponse).toStrictEqual(fixtureSearchSamsung)
  })

  it('should return an empty list if no results are available', async () => {
    const {searchProductsUseCase} = domain

    const [useCaseError, useCaseResponse] = await searchProductsUseCase({query: 'nokia'})

    expect(useCaseError).toBeNull()
    expect(useCaseResponse.length).toBe(0)
    expect(useCaseResponse).toStrictEqual(fixtureEmptyResults)
  })
})
