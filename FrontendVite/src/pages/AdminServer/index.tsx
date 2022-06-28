import './styles.css'
import Headers from '../../Componets/Header'
import Footer from '../../Componets/Footer'
import CardProducts from '../../Componets/CardProducts'
import FormCard from '../../Componets/FormCard'


import { useEffect, useState } from 'react'

import {FindProducts, ProductsType} from '../../services/Products'

type arrayProducts = ProductsType[]

function AdminServer(){
  const [products, setProducts] = useState<arrayProducts>()
  const [reload, setReload] = useState(false)

  async function ShowProducts() {
    const products : arrayProducts = await FindProducts()
    setProducts(products)
  }
  
  function showFormCardProduct(){
    const fildFormCard = document.querySelector('.admin-remove-form-card')
    fildFormCard?.classList.remove('admin-remove-form-card')
    fildFormCard?.classList.add('admin-show-form-card')

    const fildFormCardButtonRegister = document.querySelector('.admin-register-product')
    fildFormCardButtonRegister?.classList.remove('admin-register-product')
    fildFormCardButtonRegister?.classList.add('admin-remove-register-product')
  }

  const ativeReload= () => {
    setTimeout(() => {
      setReload(prev => !prev)
      const removeFildFormCardButtonRegister = document.querySelector('.admin-show-form-card')
      removeFildFormCardButtonRegister?.classList.remove('admin-show-form-card')
      removeFildFormCardButtonRegister?.classList.add('admin-remove-form-card')

      const fildFormCardButtonRegister = document.querySelector('.admin-remove-register-product')
      fildFormCardButtonRegister?.classList.remove('admin-remove-register-product')
      fildFormCardButtonRegister?.classList.add('admin-register-product')
    }, 3000);
  }

  useEffect(()=>{
    ShowProducts()
  },[reload])

  console.log(reload);
  

  return (
    <>
      <Headers/>
      {reload && <h1>{reload}</h1>}
      <div className='admin-register-product' >
          <button onClick={showFormCardProduct}>Cadastrar produto.</button>
        </div>
      <div className='show-product-container'>
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
              admin={true}
              />)
      ) : (
        <div className="menu_none">
          <h1>Não há produtos cadastrados.</h1>  
        </div>
      )}
      <div className='admin-remove-form-card'>
        <FormCard ativeReload={ativeReload}/>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminServer

