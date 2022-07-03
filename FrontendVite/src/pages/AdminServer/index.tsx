import './styles.css'

import Headers from '../../Componets/Header'
import Footer from '../../Componets/Footer'
import CardProducts from '../../Componets/CardProducts'
import FormCard from '../../Componets/FormCard'
import ListCustomeOrder from '../../Componets/ListCustomeOrder'



import { useEffect, useState } from 'react'

import {FindProducts, ProductsType} from '../../services/Products'
import { FindCustumerOrders, CustumerOdersType } from '../../services/CustomerOrders'

type arrayProducts = ProductsType[]
type arrayCustumerOders = CustumerOdersType[]



function AdminServer(){
  const [products, setProducts] = useState<arrayProducts>()
  const [reload, setReload] = useState(false)
  const [showListCustomeOrder, setShowListCustomeOrder] = useState(false)
  const [arrayCustomerOrders, setArrayCustomerOrders] = useState<arrayCustumerOders>()

  console.log(arrayCustomerOrders);
  
  
  async function LoadingCustomerOrders(){
    const customer : arrayCustumerOders = await FindCustumerOrders()
    setArrayCustomerOrders(customer)
    setShowListCustomeOrder(prev => !prev)
  }
  

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

  
  return (
    <>
      <Headers/>
      {reload && <h1>{reload}</h1>}
      <div className='admin-register-product-container'>
        {showListCustomeOrder ? (
           <div className='admin-register-product' >
               <button onClick={() =>setShowListCustomeOrder(prev => !prev) }
               >Voltar</button>
           </div>
        ): (
          <>
            <div className='admin-register-product' >
              <button onClick={showFormCardProduct}>Cadastrar produto</button>
            </div>
            <div className='admin-register-product' >
              <button onClick={
                LoadingCustomerOrders
              }>Mostrar lista de pedidos</button>
            </div>
          </>
        )}
        </div>
        {!showListCustomeOrder ? (
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
        ):(
         <div>
          <h1>Listando Pedidos:</h1>
           {arrayCustomerOrders && (
            arrayCustomerOrders?.map(customer => (
              <ListCustomeOrder 
                formOfPayment={customer.formOfPayment}
                nameProducts={customer.nameProducts}
                paymentId={customer.paymentId}
                userId={customer.userId}
                proofOfPaymentPhoto={customer.proofOfPaymentPhoto}
                key={customer.paymentId}
              />
            ))
           )}
         </div>
        )} 
      <Footer/>
    </>
  )
}

export default AdminServer


