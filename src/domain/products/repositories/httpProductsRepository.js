export class HttpProductsRepository {
  static create() {
    return new HttpProductsRepository()
  }

  async searchProducts({query, limit, offset} = {}) {
    const api = `https://prueba-tecnica-api-tienda-moviles.onrender.com/products`

    const urlSearchParams = new URLSearchParams(`?limit=${limit}&offset=${offset}`)
    if (query !== undefined) urlSearchParams.append('search', query)

    const apiHeaders = new Headers()
    // this KEY it should be stored in a .env file
    // but we should not upload .env files to the repository
    // so this is only for the challenge, to run easily on your local machine
    apiHeaders.append('x-api-key', process.env.NEXT_PUBLIC_MBST_API_KEY ?? '87909682e6cd74208f41a6ef39fe4191')

    const apiUrl = `${api}?${urlSearchParams.toString()}`

    return fetch(apiUrl, {headers: apiHeaders}).then(res => res.json())
  }
}
