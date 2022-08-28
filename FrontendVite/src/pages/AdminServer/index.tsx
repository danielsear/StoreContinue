import './styles.css'

import Headers from '../../Componets/Header'
import Footer from '../../Componets/Footer'
import CardProducts from '../../Componets/CardProducts'
import FormCard from '../../Componets/FormCard'
import ListCustomeOrder from '../../Componets/ListCustomeOrder'
import ListRegisteredSales from '../../Componets/ListRegisteredSales'



import { ChangeEvent, useEffect, useState } from 'react'

import {FindProducts, ProductsType} from '../../services/Products'
import { FindCustumerOrders, CustumerOdersType } from '../../services/CustomerOrders'
import { FindRegisteredSales, RegisteredSalesType} from '../../services/RegisteredSales'
import {  useParams } from 'react-router'


type arrayProducts = ProductsType[]
type arrayCustumerOders = CustumerOdersType[]
type arrayRegisteredSales = RegisteredSalesType[]




function AdminServer(){
  const {codigo} = useParams()

  const [products, setProducts] = useState<arrayProducts>([])
  const [arrayCustomerOrders, setArrayCustomerOrders] = useState<arrayCustumerOders>()
  const [RegisteredSales, setRegisteredSales] = useState<arrayRegisteredSales>()


  


  const [reload, setReload] = useState(false)

  const [showListCustomeOrder, setShowListCustomeOrder] = useState(false)
  const [showFormCardProduct, setShowFormCardProduct] = useState(false)
  const [showRegisteredSalesProduct, setShowRegisteredSalesProduct] = useState(false)


   const [showImagePixVoucher, setShowImagePixVoucher] = useState('')
   const [messageCancelOrSellProduct, setMessageCancelOrSellProduct] = useState({
    error: false,
    message: '',
    active: false
   })

   const [serverOff, setServerOff] = useState('')


  
  async function LoadingCustomerOrders(){
    setShowImagePixVoucher('')
    if(!arrayCustomerOrders){
      const customer : arrayCustumerOders = await FindCustumerOrders()
      setArrayCustomerOrders(customer)
    }
    setShowListCustomeOrder(prev => !prev)
  }
  
 
  async function ShowProducts() {

      const products : arrayProducts | {message: string}= await FindProducts()
    
      const message = products as {message: string}
         if(message.message){
           setServerOff(message.message)
           return
         }
     
       const arrayProducts = products as arrayProducts
         setProducts(arrayProducts)
    
  }

  async function LoadingRegisteredSales() {
    setShowImagePixVoucher('')
    if(!RegisteredSales){
      const registeredSales : arrayRegisteredSales = await FindRegisteredSales()
      setRegisteredSales(registeredSales)
    }
    setShowRegisteredSalesProduct(prev => !prev)
  }

  const ativeReload= () => {
    setTimeout(() => {
  
      setShowFormCardProduct(prev => !prev)
      setMessageCancelOrSellProduct({
        error: false,
        message: '',
        active: false
       })
       setReload(prev => !prev)
    }, 3000);
  }

  const activateReloadWhenDeleteOrEdit = () =>{ 
    setTimeout(() => {
      setReload(prev => !prev)
    }, 3000);
  }

 /* Search */
 const [query, setQuery] = useState('') 
 const queryy= products
 const search =  queryy.filter(value => value.title.toLowerCase().includes(query)) 
 function handleSearch(event : ChangeEvent<HTMLInputElement>){
   setQuery(event.target.value)
 }

  function handleShowPixVoucher(event: string){ 
    setShowImagePixVoucher(event)  
  }
  
  function handleActivateReloadCancelOrSellProduct(){

    setTimeout(() => {
      setShowListCustomeOrder(prev => !prev)
       setReload(prev => !prev)
    }, 3000);
  }


  console.log(products);
  

  useEffect(()=>{
   
    if(codigo === 'true'){
      ShowProducts()
    }
   
  },[reload])

  
  return (
    <>
      <Headers  
       search={(event: ChangeEvent<HTMLInputElement>)=> handleSearch(event)}
      codigo={codigo}
/>
     
      {reload && <h1>{reload}</h1>}
        {!serverOff && (
           <div className='admin-register-product-container'>
           {showListCustomeOrder ? (
              <div className='admin-register-product' >
                  <button onClick={() => {
                   setShowListCustomeOrder(prev => !prev)
                   setShowImagePixVoucher('')             
                  } }
                  >Voltar</button>
                 {messageCancelOrSellProduct.active && 
                 <div>{messageCancelOrSellProduct.message}</div>
                 }
              </div>
           ): (
             <>
               {!showRegisteredSalesProduct && (
                 <div className='admin-register-product' >
                   <button onClick={() => setShowFormCardProduct(prev => !prev)}
                   >{!showFormCardProduct ? (
                     "Cadastrar produto"
                   ): (
                     'Cancelar'
                   )}</button>
                 </div>
               )}
               {!showFormCardProduct &&  !showRegisteredSalesProduct &&(             
                  <div className='admin-register-product' >
                     <button onClick={
                       LoadingCustomerOrders
                     }>Mostrar lista de pedidos</button>
                  </div> 
               )}
               {!showFormCardProduct && !showListCustomeOrder  &&(             
                 <div className='admin-register-product' >
                   <button onClick={
                     LoadingRegisteredSales
                   }>{!showRegisteredSalesProduct ? (
                     "Mostrar vendas"
                   ): (
                     'Voltar'
                   )}</button>
                 </div>
               )}
        
             </>
           )}
           </div>
        )}
        {showFormCardProduct && (
            <div className='admin-showFormCardProduct'>
            <FormCard ativeReload={ativeReload}/>
          </div>
          )}
        {!showListCustomeOrder && !showRegisteredSalesProduct && (
          <>
            {query && (
                          <div className='home-show-product-group-container'>
                            <h2>Pesquisa:</h2>
                          <div className='home-show-product-group'>   
                           {search && (
                            search.map(inputSearchValue =>{
                                return (
                                  <CardProducts 
                                  activateReload={()=> ''}
                                  group={inputSearchValue.group}
                                  forwardPrice={inputSearchValue.forwardPrice}
                                  frete={inputSearchValue.frete}
                                  namePhoto={inputSearchValue.namePhoto}
                                  spotPrice={inputSearchValue.spotPrice}
                                  title={inputSearchValue.title}
                                  pricePrevious= {inputSearchValue.pricePrevious}
                                  key={inputSearchValue.productId}
                                  productId={inputSearchValue.productId}
                                  />
                                )
                            })
                           )}
                          </div>
                        </div>
                        )}
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
                  activateReload={activateReloadWhenDeleteOrEdit}
                  />)
          ) : (
            <div className="menu_none">
              {serverOff ? (
                <h2>{serverOff}</h2>
              ): (
                <h1>Não há produtos cadastrados.</h1>  
              )}
            </div>
          )}
         
          </div>
          </>
        )|| showListCustomeOrder && !showRegisteredSalesProduct &&(
         <div>
          <h1>Listando Pedidos:</h1>
           {arrayCustomerOrders && arrayCustomerOrders.length>0 && !showImagePixVoucher && (
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
              showPixVoucher={handleShowPixVoucher}
              activateReload={handleActivateReloadCancelOrSellProduct}
              />
            ))
           ) || showImagePixVoucher && !showRegisteredSalesProduct &&(
            <div className='showImagePixVoucher'>
              <div className='showImagePixVoucher-sales'>
                <h3>Comprovante de pagamento PIX</h3>
                <button onClick={()=> setShowImagePixVoucher('') }>voltar para pedidos</button>
              </div>
              <img src={showImagePixVoucher} alt="Comprovante de pagamento." />
            </div>
           ) || (
            <div>
              <h2>Nenhum pedido cadastrado.</h2>
            </div>
           )}
         </div>
        )|| !showListCustomeOrder && !showImagePixVoucher && showRegisteredSalesProduct &&(
          <div className='ListRegisteredSales-container'>
            <div className='ListRegisteredSales-box'>
              <table>
                <thead>
                  <tr>
                    <th>Id da venda</th>
                    <th>Data do pedido</th>
                    <th>Data da venda</th>
                    <th>Nome do comprador</th>
                    <th>Itens da venda</th>
                    <th>Tipo da venda</th>
                    <th>Comprovante da venda</th>
                  </tr>
                </thead>
              </table>
            </div>
            {RegisteredSales && RegisteredSales.map(registers => {
              if(registers.createAt){
                return (
                  <ListRegisteredSales
                  orderDate={registers.orderDate}
                  paymentId={registers.paymentId}
                  title={registers.title}
                  typePurchase={registers.typePurchase}
                  userId={registers.userId}
                  cashPayment={registers.cashPayment}
                  deferredPayment={registers.deferredPayment}
                  key={registers.paymentId}
                  namePhoto={registers.namePhoto}
                  nameUser={registers.nameUser}
                  createAt={registers.createAt}
                  showPixVoucher={handleShowPixVoucher}
                  />
                )
              }
            }) }
          </div>
        )|| !showListCustomeOrder && showImagePixVoucher && showRegisteredSalesProduct  && (
          <div className='showImagePixVoucher'>
            <div className='showImagePixVoucher-sales'>
            <h3>Comprovante de pagamento PIX</h3>
            <button onClick={()=> setShowImagePixVoucher('') }>voltar as vendas</button>
            </div>
            <img src={showImagePixVoucher} alt="Comprovante de pagamento." />
          </div>
        )
        } 
      <Footer/>
    </>
  )
}

export default AdminServer


