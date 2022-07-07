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
  const [arrayCustomerOrders, setArrayCustomerOrders] = useState<arrayCustumerOders>()
 
  
  const [reload, setReload] = useState(false)
  const [showListCustomeOrder, setShowListCustomeOrder] = useState(false)
  const [showFormCardProduct, setShowFormCardProduct] = useState(false)

  const [inputSearchValue, setInputSearchValue] = useState('')
  
  async function LoadingCustomerOrders(){
    const customer : arrayCustumerOders = await FindCustumerOrders()
    setArrayCustomerOrders(customer)
    setShowListCustomeOrder(prev => !prev)
  }
  
  async function ShowProducts() {
    const products : arrayProducts = await FindProducts()
    setProducts(products)
  }
  

  const ativeReload= () => {
    setTimeout(() => {
      setReload(prev => !prev)
      setShowFormCardProduct(prev => !prev)
    }, 3000);
  }

  const ativeReloadDelete = () =>{
    setTimeout(() => {
      setReload(prev => !prev)
    }, 3000);
  }

  useEffect(()=>{
    ShowProducts()
    
  },[reload])

  
  return (
    <>
      <Headers search={(event: string)=> setInputSearchValue(event)}/>
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
              <button onClick={() => setShowFormCardProduct(prev => !prev)}
              >{!showFormCardProduct ? (
                "Cadastrar produto"
              ): (
                'Cancelar'
              )}</button>
            </div>
            {!showFormCardProduct && (
               <div className='admin-register-product' >
                  <button onClick={
                    LoadingCustomerOrders
                  }>Mostrar lista de pedidos</button>
               </div>
            )}
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
                  spotPrice={product.spotPrice}
                  title={product.title}
                  pricePrevious= {product.pricePrevious}
                  key={product.productId}
                  productId={product.productId}
                  admin={true}
                  group={product.group}
                  ativeReload={ativeReloadDelete}
                  />)
          ) : (
            <div className="menu_none">
              <h1>Não há produtos cadastrados.</h1>  
            </div>
          )}
          {showFormCardProduct && (
            <div className='admin-showFormCardProduct'>
            <FormCard ativeReload={ativeReload}/>
          </div>
          )}
          </div>
        ):(
         <div>
          <h1>Listando Pedidos:</h1>
           {arrayCustomerOrders && arrayCustomerOrders.length>0 ? (
            arrayCustomerOrders?.map(customer => (
              <ListCustomeOrder 
                formOfPayment={customer.formOfPayment}
                nameProducts={customer.nameProducts}
                paymentId={customer.paymentId}
                userId={customer.userId}
                proofOfPaymentPhoto={customer.proofOfPaymentPhoto}
                spotPrice={customer.spotPrice}
                forwardPrice={customer.forwardPrice}
                createAt={customer.createAt}
                key={customer.paymentId}
              />
            ))
           ) : (
            <div>
              <h2>Nenhum pedido cadastrado.</h2>
            </div>
           )}
         </div>
        )} 
      <Footer/>
    </>
  )
}

export default AdminServer


