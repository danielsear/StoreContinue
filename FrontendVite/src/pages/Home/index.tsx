import './styles.css'

import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Footer from '../../Componets/Footer'
import Header from '../../Componets/Header'
import CardProducts from '../../Componets/CardProducts'

import { FindProducts, ProductsType } from '../../services/Products'


type arrayProducts = ProductsType[]


function Home() {
  const [products, setProducts] = useState<arrayProducts >()
  const { userId } = useParams()

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
          />)
      ) : (
        <div className="menu_none">
          <h1>Não há produtos cadastrados.</h1>
        </div>
      )}
      </div>
      <Footer />
    </>
  )
}



export default Home
