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

 
   const [totalTermValue, setTotalTermValue] = useState(0)
   const [totalInSightValue, setTotalInSightValue] = useState(0)

   
  


  const { userId } = useParams()


  async function ShowProducts() {
    const products : arrayProducts = await FindProducts()
    setProducts(products)
  }

function handleCartValue(){
  var SomaForwardPrice = 0
  var SomaSpotPrice= 0

   productsAddedToShoppingCart.map(product =>{
    if( product.forwardPrice && product.forwardPrice !== ''){
      const stringToNumber = parseFloat(product.forwardPrice.replace(',', '.'))
      SomaForwardPrice += stringToNumber
    }
     setTotalTermValue( SomaForwardPrice)

    if( product.spotPrice && product.spotPrice !== ''){
      const stringToNumber = parseFloat(product.spotPrice.replace(',', '.'))
      SomaSpotPrice += stringToNumber
    }
    setTotalInSightValue(SomaSpotPrice)
  })
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
              spotPrice: product.spotPrice,
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
          <h1>Carrinho:</h1>
          {productsAddedToShoppingCart.map(product => (
           <div className='card-shopping-cart' key={product.id} >
            {product.id !== '' && (
             <div>
               <div><h3>{product.title}</h3></div>
              {product.frete && (
                <div className='card-frete'>Frete : R$ {product.frete}</div>
              )}
              <div className='card-shopping-cart-value'>Preço à prazo: R$ {product.forwardPrice}</div>
              <div className='card-shopping-cart-value'>Preço à vista: R$ {product.spotPrice}</div>
              <hr/>
             </div>
            )}
           </div>
          ))}
               <div className='card-shopping-cart-total-value'>
                <div className='card-shopping-cart-total-value-button' 
                onClick={handleCartValue}>
                  Fechar container
                </div>
               {(totalTermValue !== 0 || totalInSightValue !== 0) && (
                <>
                    <div className='card-shopping-cart-value'>
                     Total à vista: R$ {totalTermValue}
                    </div>
                    <div className='card-shopping-cart-value'>
                      Total à prazo: R$ {totalInSightValue}
                    </div>
                </>
               )}
           </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  )
}



export default Home
