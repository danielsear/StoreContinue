


export type ProductsType = {
  title: string,
  frete?:string,
  spotPrice:string,
  namePhoto?: string,
  forwardPrice: string,
  pricePrevious: string,
  productId?: string,
  admin?: boolean,
  userLogged?: string
}

async function FindProducts() {
 return await fetch('http://localhost:3333/products',{
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json'
    }
  }).then(res => res.json())
  .then(data =>{
   return data
  })
  .catch(err => console.error(err))
}

async function CreateProduct(data: ProductsType) {
  const { title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete } = data

 return await fetch('http://localhost:3333/product-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete })
  })
    .then()
    .catch(err => console.error(err))
}

async function UpdateProduct(data: ProductsType) {
  const { title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete }  = data

 return await fetch('http://localhost:3333/product-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, spotPrice, forwardPrice, productId, namePhoto,pricePrevious,frete })
  })
    .then()
    .catch(err => console.error(err))
}

async function DeleteProduct(productId:string) {
   return await fetch(`http://localhost:3333/delete-product/${productId}`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then().catch(err=> console.error(err))
}

export { FindProducts,CreateProduct, UpdateProduct, DeleteProduct}