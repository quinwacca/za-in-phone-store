import {describe, it, expect} from 'vitest'
import {setupServer} from 'msw/node'
import {domain} from '@/domain'
import {afterAll, afterEach, beforeAll} from 'vitest'
import {http, HttpResponse} from 'msw'

const samsungId = 'SMG-S24U'
const fixtureSamsung = {
  id: samsungId,
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  description:
    'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.',
  basePrice: 1329,
  rating: 4.6,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: '3120 x 1440 pixels',
    processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core',
    mainCamera:
      '200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS',
    selfieCamera: '12 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz'
  },
  colorOptions: [
    {
      name: 'Titanium Violet',
      hexCode: '#8E6F96',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
    },
    {
      name: 'Titanium Black',
      hexCode: '#000000',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-black.webp'
    },
    {
      name: 'Titanium Gray',
      hexCode: '#808080',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-gray.webp'
    },
    {
      name: 'Titanium Yellow',
      hexCode: '#FFFF00',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-yellow.webp'
    }
  ],
  storageOptions: [
    {
      capacity: '256 GB',
      price: 1229
    },
    {
      capacity: '512 GB',
      price: 1329
    },
    {
      capacity: '1 TB',
      price: 1529
    }
  ],
  similarProducts: [
    {
      id: 'SMG-A05S',
      brand: 'Samsung',
      name: 'Galaxy A05s',
      basePrice: 119,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A05S-black.webp'
    },
    {
      id: 'SMG-S23FE',
      brand: 'Samsung',
      name: 'Galaxy S23 FE',
      basePrice: 699,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S23FE-purple.webp'
    },
    {
      id: 'RLM-NOTE50',
      brand: 'realme',
      name: 'Note 50',
      basePrice: 99,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/RLM-NOTE50-midnight-black.webp'
    },
    {
      id: 'OPP-R11F',
      brand: 'OPPO',
      name: 'Reno 11 F',
      basePrice: 269,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-R11F-verde.webp'
    },
    {
      id: 'MTE-EDGE50PRO',
      brand: 'Motorola',
      name: 'edge 50 Pro',
      basePrice: 649,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTE-EDGE50PRO-negro.webp'
    },
    {
      id: 'GPX-8A',
      brand: 'Google',
      name: 'Pixel 8a',
      basePrice: 459,
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp'
    }
  ]
}
const noProductId = 'NOKIA-3310'

const handlers = [
  http.get(`https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${samsungId}`, () => {
    return HttpResponse.json(fixtureSamsung)
  }),
  http.get(`https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${noProductId}`, () => {
    return new HttpResponse(
      {
        error: 'NOT-FOUND',
        message: 'Product not found'
      },
      {status: 404}
    )
  })
]

const server = setupServer(...handlers)

describe('getProductUseCase Test', () => {
  beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())

  it('should return a product when id exists in database', async () => {
    const {getProductUseCase} = domain

    const [useCaseError, useCaseResponse] = await getProductUseCase({id: samsungId})

    expect(useCaseError).toBeNull()
    expect(useCaseResponse).toStrictEqual(fixtureSamsung)
  })

  it('should return an error if product doesnt exists', async () => {
    const {getProductUseCase} = domain

    const [useCaseError, useCaseResponse] = await getProductUseCase({id: noProductId})

    expect(useCaseError).toBeDefined()
    expect(useCaseResponse).toBeNull()
  })
})
