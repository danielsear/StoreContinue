import './styles.css'

import React, { ChangeEvent } from 'react'

import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { v4 } from 'uuid'

import Footer from '../../Componets/Footer'
import Header from '../../Componets/Header'
import CardProducts from '../../Componets/CardProducts'

import { FindProducts, ProductsType } from '../../services/Products'
import {  RegisterImage, FindImage, DataImageType } from '../../services/Images'
import {  FindUsers, User } from '../../services/User'


import { CreateCustomerOrders,DataPaymentType} from '../../services/CustomerOrders'
import { AuthContext } from '../../provider/auth'

type arrayUsers = User[]
type arrayDataImageType = DataImageType[]


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
  const { userId } = useParams()
  const [products, setProducts] = useState<arrayProducts >([])

 const produtos = React.useContext(AuthContext)
  

 
  
  const [user, setUser] = useState<User | null>()
  const [imageUser, setImageUser] = useState('')

  
  const [productsAddedToShoppingCart, setProductsAddedToShoppingCart] =
   useState<arrayProductsShoppingCartType>([{
    forwardPrice: '',
    spotPrice: '',
    title: '',
    id: ''
   }])
 
   const [totalTermValue, setTotalTermValue] = useState(0)
   const [totalInSightValue, setTotalInSightValue] = useState(0)
   const [finalizingThePurchase, setFinalizingThePurchase] = useState(false)
   const [pixPayment, setPixPayment] = useState(false)
   const [imgPaymentPix, setImgPaymentPix] = useState<File>()
   const [message, setMessage] = useState<DataPaymentType>()
   const [refreshingPage, setRefreshingPage] = useState(false)
   const [serverOff, setServerOff] = useState('')
   

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

  async function getUser() {
    if(userId){
     const dataUser: arrayUsers = await FindUsers()
     // const userLogged = dataUser.map(data => console.log(data))
 
     if (dataUser && userId) {
       const userLogged = dataUser.find(data => data.userId === userId)
       setUser(userLogged)
       
       if(userLogged?.file){
         const dataImage: arrayDataImageType  = await FindImage()
 
         const imageUserLogged = dataImage.find(data => data.name === userLogged.file)
         
         if(imageUserLogged){
           setImageUser(imageUserLogged.url)
         }
       }
     }
    }
  }

  function handleCartValue(){
    setTotalInSightValue(0)
    setTotalTermValue(0)
  var SomaForwardPrice = 0
  var SomaSpotPrice= 0

   productsAddedToShoppingCart.map(product =>{
    if( product.forwardPrice && product.forwardPrice !== ''){
      const stringToNumber = parseFloat(product.forwardPrice.replace(',', '.'))
      SomaForwardPrice += stringToNumber
      if(product.frete){
      const stringToNumber = parseFloat(product.frete.replace(',', '.'))
      SomaForwardPrice += stringToNumber
      }
    }
      const total= ( 3 * SomaForwardPrice)
     setTotalTermValue( total)

    if( product.spotPrice && product.spotPrice !== ''){
      const stringToNumber = parseFloat(product.spotPrice.replace(',', '.'))
      SomaSpotPrice += stringToNumber
      if(product.frete){
        const stringToNumber = parseFloat(product.frete.replace(',', '.'))
        SomaSpotPrice += stringToNumber
        }
    }
    setTotalInSightValue(SomaSpotPrice)
  })
  }

  function handleRefreshingPage(){
          setFinalizingThePurchase(false)
          setPixPayment(false)
          setProductsAddedToShoppingCart([{
            forwardPrice: '',
            spotPrice: '',
            title: '',
            id: ''
           }])
          setMessage({
            error: true,
            message: ''
           })
          setTotalInSightValue(0)
          setTotalTermValue(0)
          setFinalizingThePurchase(false)
          setRefreshingPage(true)
  }

  async function handlePixPayment() {

    const paymentId = v4()
    const nameProducts = productsAddedToShoppingCart.map(product => product.title)

    const formData = new FormData()
    if(imgPaymentPix){
      formData.append('file', imgPaymentPix)
      
      const imgdata = await RegisterImage(formData)

      if(userId){
        const dataPayment  = await CreateCustomerOrders({
          nameProducts: nameProducts,
          paymentId : paymentId,
          formOfPayment: 'PIX',
          proofOfPaymentPhoto: imgPaymentPix.name,
          userId: userId,
          spotPrice: totalInSightValue.toString(),
          forwardPrice: totalTermValue.toString(),
        })
        setMessage(dataPayment)
        setTimeout(() => {
          handleRefreshingPage()
        }, 3000);
      }
    }
  
    
  }

  async function handlePaymentInStore() {
    const paymentId = v4()
    const nameProducts = productsAddedToShoppingCart.map(product => product.title)

    if(userId){
      const dataPayment  = await CreateCustomerOrders({
        nameProducts: nameProducts,
        paymentId : paymentId,
        formOfPayment: 'Payment in store',
        userId: userId,
        spotPrice: totalInSightValue.toString(),
        forwardPrice: totalTermValue.toString(),
      })
      setMessage(dataPayment)
      setTimeout(() => {
        handleRefreshingPage()
      }, 3000);
    }
  }

  /* Search */
  const [query, setQuery] = useState('') 
  const queryy= products
  const search =  queryy.filter(value => value.title.toLowerCase().includes(query)) 
  function handleSearch(event : ChangeEvent<HTMLInputElement>){
    setQuery(event.target.value)
  }

  useEffect(()=>{
    ShowProducts()
    if(userId){
      getUser()
    }
  },[refreshingPage])

  return (
    <>
     {!serverOff && (
       <Header 
       reaload={()=> {
        setUser(null)
       }}
       user={user}
       imageUser={imageUser}
       search={(event: ChangeEvent<HTMLInputElement>)=> handleSearch(event)}
       />
     )}
      <div className='home-container'>
        {!finalizingThePurchase ? (
               <div className='home-show-product-container'>

               {products ? (
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
                                  userLogged={userId}
                                  addProduct={() => {
                                      setProductsAddedToShoppingCart(
                                       [...productsAddedToShoppingCart,{
                                      title : inputSearchValue.title,
                                      forwardPrice: inputSearchValue.forwardPrice,
                                      frete: inputSearchValue.frete,
                                      spotPrice: inputSearchValue.spotPrice,
                                      id: inputSearchValue.productId
                                      }])
                                  }}
                                  />
                                )
                              
                            })
                           )}
                      
                          </div>
                        </div>
                        )}

                        <div className='home-show-product-group-container'>
                          <h2>Brinquedos:</h2>
                          <div className='home-show-product-group'>     
                          {  products.map(product => 
                             {
                              if(product.group === 'Brinquedo'){
                                return(
                                  <CardProducts 
                             activateReload={()=> ''}
                             group={product.group}
                             forwardPrice={product.forwardPrice}
                             frete={product.frete}
                             namePhoto={product.namePhoto}
                             spotPrice={product.spotPrice}
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
                             />
                                )
                              }
                             }
                            )}
                          </div>
                        </div>
                      
                        <div className='home-show-product-group-container'>
                          <h2>Produtos de casa:</h2>
                          <div className='home-show-product-group'>     
                          {  products.map(product => 
                             {
                              if(product.group === 'Produtos de casa'){
                                return(
                                  <CardProducts 
                             activateReload={()=> ''}
                             group={product.group}
                             forwardPrice={product.forwardPrice}
                             frete={product.frete}
                             namePhoto={product.namePhoto}
                             spotPrice={product.spotPrice}
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
                             />
                                )
                              }
                             }
                            )}
                          </div>
                        </div>
                        
                        <div className='home-show-product-group-container'>
                          <h2>Papelaria:</h2>
                          <div className='home-show-product-group'>     
                          {  products.map(product => 
                             {
                              if(product.group === 'Papelaria'){
                                return(
                                  <CardProducts 
                             activateReload={()=> ''}
                             group={product.group}
                             forwardPrice={product.forwardPrice}
                             frete={product.frete}
                             namePhoto={product.namePhoto}
                             spotPrice={product.spotPrice}
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
                             />
                                )
                              }
                             }
                            )}
                          </div>
                        </div>
                        
                      </>     
               ) : (
                 <div className="menu_none">
                        {serverOff? (
                           <>
                            <div id="header_container">
                              <section className="logo">Kassinha Variedades</section>
                              <h2>...{serverOff}</h2>
                            </div>
                             
                          </>
                        ):(
                          <h1>Não há produtos cadastrados.</h1>
                        )}
                 </div>
               )}
               </div>
        ): (
          <div className='home-menu-finalizingThePurchase'>
            <h2>Orientação para fechamento da compra:</h2>
            <p> Para sua segurança e da empresa Kassinha Variedades, será necessário,
              a sua escolha, a forma de pagamento: 
            </p>   
            <p><strong>Observação:</strong> pagamento via PIX deverá ser somente debitado  valor à vista. 
            E a liberação será feita somente após<br/> comprovação, por meio do comprovante enviado ou
              físico demonstrado na hora da retirada no caixa.
            </p>        
            <p><strong>1-</strong> Você poderá escolher pagar via Pix com o código da loja NUMERO-PIX-DA-LOJA.</p>
             {!pixPayment  ? (
               <div className='card-shopping-cart-close-value-button finalizingThePurchase'
               onClick={() => setPixPayment(prev => !prev)}
             >
                    Pagamento via PIX
             </div>
             ):(
                <div className='card-shopping-cart-close-value-payment-pix'>
                  <p><strong>a)</strong> Primeiramente, faça o pagamento utilizando o numero pix da loja <strong>NUMERO-PIX-DA-LOJA.</strong></p>
                  <p><strong>b)</strong> Segundo, tire um print ou foto do comprovante do pix e faça o upload(carregamento) da foto ou print na seção abaixo:</p>
                  {imgPaymentPix && (
                    <div className="card-shopping-cart-close-value-payment-pix-show-img">
                      <img
                        src={URL.createObjectURL(imgPaymentPix)}
                        alt="Image"
                        width="200"
                        height="200"
                      />
                  </div>
                  )}
                  <div className='card-shopping-cart-close-value-payment-pix-img'>              
                        <input type='file' name='file' onChange={(event)=> {
                          const files = event.target.files
                          if(files){
                            const file = files[0]
                            setImgPaymentPix(file)
                          }
                        }}/>
                      </div>
                      {imgPaymentPix && (
                       <div className='card-shopping-cart-close-value-payment-pix-img-button'>
                         {!message?.message ? (
                          <button onClick={handlePixPayment} >Finalizar a compra</button>
                         ): (
                          <div className='card-shopping-cart-close-value-payment-pix-confirm-message'>
                            {message.message}
                          </div>
                         )}
                       </div>
                      )}
                </div>
             )}
            {!pixPayment && (
              <>
                <p><strong>2-</strong> Você poderá escolher pagar na loja pessoalmente.</p> 
                
                {message?.message ? (
                   <div className='card-shopping-cart-close-value-payment-pix-confirm-message'>
                   {message.message}
                 </div>
                ):(
                  <div className='card-shopping-cart-close-value-button finalizingThePurchase'
                  onClick={handlePaymentInStore}
                >
                      Pagamento na loja
                </div>
                )}
              </>
            )}
          </div>
        )}

      {productsAddedToShoppingCart.length > 1 && (
        <div className='home-menu-shopping-cart'>
          <h1>Carrinho de compras:</h1>
          {productsAddedToShoppingCart.map(product => (
           <div className='card-shopping-cart' key={product.id} >
            {product.id !== '' && (
             <div>
               <div><h3>{product.title}</h3></div>
              {product.frete && (
                <div className='card-frete'>Frete : R$ {product.frete}</div>
              )}
              <div className='card-shopping-cart-value'>Preço à prazo: até 3x de R$ {product.forwardPrice}</div>
              <div className='card-shopping-cart-value'>Preço à vista: R$ {product.spotPrice}</div>
              <hr/>
             </div>
            )}
           </div>
          ))}
               <div className='card-shopping-cart-total-value'>
                {!finalizingThePurchase && !(totalTermValue !== 0 || totalInSightValue !== 0) && (
                  <div className='card-shopping-cart-total-value-button' 
                  onClick={handleCartValue}>
                    Calcular total
                  </div>
                )}
               {(totalTermValue !== 0 || totalInSightValue !== 0) && (
                <>
                    <div className='card-shopping-cart-value'>
                      Total à prazo: R$ {totalTermValue}
                    </div>
                    <div className='card-shopping-cart-value'>
                     Total à vista: R$ {totalInSightValue}
                    </div> 
                   {!finalizingThePurchase && (
                     <div className='card-shopping-cart-close-value-button' 
                     onClick={() => setFinalizingThePurchase(prev => !prev)}  >
                       Fazer pedido
                     </div> 
                   )} 
                   {finalizingThePurchase  && (
                     <div className='card-shopping-cart-total-value-button' 
                     onClick={handleRefreshingPage}  >
                       Cancelar pedido
                     </div> 
                   )}                 
                </>
               )}     
           </div>
        </div>
      )}
      </div>
      {!serverOff && (
        <Footer />
      )}
    </>
  )
}



export default Home
