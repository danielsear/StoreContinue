import './styles.css'

import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { v4 } from 'uuid'

import Footer from '../../Componets/Footer'
import Header from '../../Componets/Header'
import CardProducts from '../../Componets/CardProducts'

import { FindProducts, ProductsType } from '../../services/Products'
import {  RegisterImage } from '../../services/Images'

import { CreateCustomerOrders,DataPaymentType} from '../../services/CustomerOrders'



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
   const [finalizingThePurchase, setFinalizingThePurchase] = useState(false)
   const [pixPayment, setPixPayment] = useState(false)
   const [imgPaymentPix, setImgPaymentPix] = useState<File>()
   const [message, setMessage] = useState<DataPaymentType>()
   const [refreshingPage, setRefreshingPage] = useState(false)

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

   


  async function ShowProducts() {
    const products : arrayProducts = await FindProducts()
    setProducts(products)
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



  useEffect(()=>{
    ShowProducts()
  },[refreshingPage])

  return (
    <>
      <Header 
      userId={userId}  
      search={(event: string)=> handleInputSearchValue(event)}
      />
      <div className='home-container'>
        {!finalizingThePurchase ? (
               <div className='home-show-product-container'>
               {products ? (
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
                              }
                            })
                           ): (
                            <>
                              {handleTimeCloseSearch()}
                              <h2>Item n??o encontrado</h2>
                            </>    
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
                             ativeReload={()=> ''}
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
                             ativeReload={()=> ''}
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
                             ativeReload={()=> ''}
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
                   <h1>N??o h?? produtos cadastrados.</h1>
                 </div>
               )}
               </div>
        ): (
          <div className='home-menu-finalizingThePurchase'>
            <h2>Orienta????o para fechamento da compra:</h2>
            <p> Para sua seguran??a e da empresa Kassinha Variedades, ser?? necess??rio,
              a sua escolha, a forma de pagamento: 
            </p>   
            <p><strong>Observa????o:</strong> pagamento via PIX dever?? ser somente debitado  valor ?? vista. 
            E a libera????o ser?? feita somente ap??s<br/> comprova????o, por meio do comprovante enviado ou
              f??sico demonstrado na hora da retirada no caixa.
            </p>        
            <p><strong>1-</strong> Voc?? poder?? escolher pagar via Pix com o c??digo da loja NUMERO-PIX-DA-LOJA.</p>
             {!pixPayment ? (
               <div className='card-shopping-cart-close-value-button finalizingThePurchase'
               onClick={() => setPixPayment(prev => !prev)}
             >
                    Pagamento via PIX
             </div>
             ):(
                <div className='card-shopping-cart-close-value-payment-pix'>
                  <p><strong>a)</strong> Primeiramente, fa??a o pagamento utilizando o numero pix da loja <strong>NUMERO-PIX-DA-LOJA.</strong></p>
                  <p><strong>b)</strong> Segundo, tire um print ou foto do comprovante do pix e fa??a o upload(carregamento) da foto ou print na se????o abaixo:</p>
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
                <p><strong>2-</strong> Voc?? poder?? escolher pagar na loja pessoalmente.</p> 
                
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
              <div className='card-shopping-cart-value'>Pre??o ?? prazo: at?? 3x de R$ {product.forwardPrice}</div>
              <div className='card-shopping-cart-value'>Pre??o ?? vista: R$ {product.spotPrice}</div>
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
                      Total ?? prazo: R$ {totalTermValue}
                    </div>
                    <div className='card-shopping-cart-value'>
                     Total ?? vista: R$ {totalInSightValue}
                    </div> 
                   {!finalizingThePurchase && (
                     <div className='card-shopping-cart-close-value-button' 
                     onClick={() => setFinalizingThePurchase(prev => !prev)}  >
                       Fazer pedido
                     </div> 
                   )} 
                   {finalizingThePurchase && (
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
      <Footer />
    </>
  )
}



export default Home
