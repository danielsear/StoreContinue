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

 
  const [inputSearchValue, setInputSearchValue] = useState<arrayProducts>([{
    forwardPrice:' ',
    group:'',
    pricePrevious: '',
    spotPrice: '',
    title: ''
   }])
   const [SearchValue, setSearchValue] = useState(['init'])

   const [activeSearchProduct, setActiveSearchProduct] = useState(false)
   const [showActiveSearchProduct, setShowActiveSearchProduct] = useState(false)

   const [showImagePixVoucher, setShowImagePixVoucher] = useState('')


  
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

  function handleInputSearchValue(event : string){
    const eventsplit = event.split(' ')

    
    setShowActiveSearchProduct(false)
    if(products){

      setActiveSearchProduct(true)

       products.map(product => {
        const titlesplit = product.title.split(' ')
         

          eventsplit.map(eventText =>{
            titlesplit.map(titleText => {
              
             const titlesplitlowercase = titleText.toLowerCase()
             const eventsplitlowercase = eventText.toLowerCase()

             const countString= eventsplitlowercase.length

             if(countString > 3){

              if(eventsplitlowercase === titlesplitlowercase){ 
                
              setShowActiveSearchProduct(true)
                
                if(inputSearchValue){

                  const confirme = SearchValue.map(text => {    
                    const arrayText = text.split(' ')
                   
                    const consult=  arrayText.map(text =>{
                        if(text === titlesplitlowercase){
                          return true
                        }
                      })
                    const confirmConsult = consult.find(text => text === true)
                    if(confirmConsult){
                      return confirmConsult
                    }else{
                      false
                    }
                 }) 
                 
                 const confirmePosition = confirme.find(text => text === true)
                 if(confirmePosition){             
                  return
                 }

                 confirme.map(reset => false)

                 setSearchValue([...SearchValue, product.title.toLowerCase()]) 

                  setInputSearchValue([...inputSearchValue,{
                    forwardPrice: product.forwardPrice,
                    group: product.group,
                    pricePrevious: product.pricePrevious,
                    productId: product.productId,
                    spotPrice: product.spotPrice,
                    title: product.title,
                    namePhoto: product.namePhoto,
                    userLogged: product.userLogged
                  }])                             
              }     
            }
             }           
          } )
        })
      })
    }
  }

  function handleTimeCloseSearch(){
    setTimeout(() => {
    setActiveSearchProduct(false)
    }, 3000);
  }

  function handleShowPixVoucher(event: string){
    setShowImagePixVoucher(event)
  }


  useEffect(()=>{
    ShowProducts()
    
  },[reload])

  
  return (
    <>
      <Headers  search={(event: string)=> handleInputSearchValue(event)}
/>
      {reload && <h1>{reload}</h1>}
      <div className='admin-register-product-container'>
        {showListCustomeOrder ? (
           <div className='admin-register-product' >
               <button onClick={() => {
                setShowListCustomeOrder(prev => !prev)
                setShowImagePixVoucher('')
               } }
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
          <>
            {activeSearchProduct && (
                          <div className='home-show-product-group-container'>
                            <h2>Pesquisa:</h2>
                          <div className='home-show-product-group'>   
                           {showActiveSearchProduct ? (
                            inputSearchValue.map(inputSearchValue =>{
                              if(inputSearchValue.title !== ''){
                                return (
                                  <CardProducts 
                                  ativeReload={()=> ''}
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
                              }
                            })
                           ): (
                            <>
                              {handleTimeCloseSearch()}
                              <h2>Item não encontrado</h2>
                            </>    
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
          </>
        ):(
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
            />
            ))
           ) || showImagePixVoucher && (
            <div className='showImagePixVoucher'>
              <h3>Comprovante de pagamento PIX</h3>
              <img src={showImagePixVoucher} alt="Comprovante de pagamento." />
            </div>
           ) || (
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


