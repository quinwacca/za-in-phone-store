export class ApiFetcher {
  #baseApiUrl
  #fetcherOptions

  static create() {
    return new ApiFetcher()
  }

  constructor() {
    const apiHeaders = new Headers()
    // this KEY it should be stored in a .env file
    // but we should not upload .env files to the repository
    // so this is only for the challenge, to run easily on your local machine
    apiHeaders.append('x-api-key', process.env.NEXT_PUBLIC_MBST_API_KEY ?? '87909682e6cd74208f41a6ef39fe4191')

    this.#baseApiUrl = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
    this.#fetcherOptions = {headers: apiHeaders}
  }

  async get(_url) {
    const url = `${this.#baseApiUrl}${_url}`
    return fetch(url, {method: 'GET', ...this.#fetcherOptions})
  }
}
