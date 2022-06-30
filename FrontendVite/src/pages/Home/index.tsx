import './styles.css'

import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Footer from '../../Componets/Footer'
import Header from '../../Componets/Header'
import CardProducts from '../../Componets/CardProducts'

import { FindProducts, ProductsType } from '../../services/Products'


type arrayProducts = ProductsType[]

type ProductsShoppingCartType = {
  title: string,
  frete?:string,
  spotPrice?:string,
  forwardPrice?: string,
  id?: string
}

type arrayProductsShoppingCartType = ProductsShoppingCartType[]

function Home() {
  const [products, setProducts] = useState<arrayProducts >()
  const [productsAddedToShoppingCart, setProductsAddedToShoppingCart] =
   useState<arrayProductsShoppingCartType>([{
    forwardPrice: '',
    spotPrice: '',
    title: '',
    id: ''
   }])

  const { userId } = useParams()

  console.log(productsAddedToShoppingCart);


  

  async function ShowProducts() {
    const products : arrayProducts = await FindProducts()
    setProducts(products)
  }





  useEffect(()=>{
    ShowProducts()
  },[])

  return (
    <>
      <Header userId={userId} />
      <div className='home-container'>
      <div className='home-show-product-container'>
      {products ? (
         products.map(product => 
          <CardProducts 
          forwardPrice={product.forwardPrice}
          frete={product.frete}
          namePhoto={product.namePhoto}
          spotPrice={product.forwardPrice}
          title={product.title}
          pricePrevious= {product.pricePrevious}
          key={product.productId}
          productId={product.productId}
          userLogged={userId}
          addProduct={() => {
             setProductsAddedToShoppingCart([...productsAddedToShoppingCart,{
              title : product.title,
              forwardPrice: product.forwardPrice,
              frete: product.frete,
              id: product.productId
             }])
          }}
          />)
      ) : (
        <div className="menu_none">
          <h1>Não há produtos cadastrados.</h1>
        </div>
      )}
      </div>
      {productsAddedToShoppingCart.length > 1 && (
        <div className='home-menu-shopping-cart'>
          <h1>Itens Selecionados</h1>
          {productsAddedToShoppingCart.map(product => (
            <div className='card-shopping-cart' key={product.id}>
              <div>{product.title}</div>
              {product.frete && (
                <div>Frete : {product.frete}</div>
              )}
              <div>Preço à prazo: {product.forwardPrice}</div>
              <div>Preço à vista: {product.spotPrice}</div>
              <hr/>
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer />
    </>
  )
}



export default Home
