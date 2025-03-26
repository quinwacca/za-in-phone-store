const importFactory = ({context, params, useCase}) =>
  import(`./${context}/useCases/${useCase}.js`)
    .then(module => module[useCase].create())
    .then(useCase => useCase.execute(params))
    // returning response with an [error, response] tuple
    .then(response => [null, response])
    .catch(error => [error, null])

const cartUseCases = {
  addToCartUseCase: params => importFactory({context: 'cart', params, useCase: 'AddToCartUseCase'}),
  getCartUseCase: params => importFactory({context: 'cart', params, useCase: 'GetCartUseCase'}),
  removeFromCartUseCase: params => importFactory({context: 'cart', params, useCase: 'RemoveFromCartUseCase'})
}

const productsUseCases = {
  getProductUseCase: params => importFactory({context: 'products', params, useCase: 'GetProductUseCase'}),
  searchProductsUseCase: params => importFactory({context: 'products', params, useCase: 'SearchProductsUseCase'})
}

export const domain = {...cartUseCases, ...productsUseCases}
