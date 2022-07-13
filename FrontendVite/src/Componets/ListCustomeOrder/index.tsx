import './styles.css'

import { FindUsers, User } from '../../services/User'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType } from '../../services/Images'
import { DeleteCustomerOrders } from '../../services/CustomerOrders'
import { CreateRegisteredSales } from '../../services/RegisteredSales'



type arrayUser = User[]
type arrayImages = DataImageType[]

type ListCustomeOrderType = {
  nameProducts: Array<string>,
    userId: string,
    proofOfPaymentPhoto?: string | undefined,
    formOfPayment: string,
    paymentId: string,
    spotPrice: string,
    forwardPrice?: string | undefined,
    createAt: string,
    showPixVoucher: (event: string) => void
    activateReload: () => void
}


function ListCustomeOrder(data : ListCustomeOrderType){
  const {formOfPayment,
     nameProducts,
     userId,
     proofOfPaymentPhoto,
      spotPrice, 
      forwardPrice,
      createAt,
      showPixVoucher,
      paymentId,
      activateReload
    } = data

  const [user, setUser]= useState<User>()
  const [image, setImage]= useState<DataImageType>()
  const [message, setMessage] = useState({
    error: false,
    message: '',
    active: false
  })

    const d = new Date(createAt);
    const date = d.toLocaleDateString("pt-br", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  

  const client  = async () => {
    const clients : arrayUser = await FindUsers()
    const clientInfo = clients.find(client => client.userId === userId)
    if( clientInfo){
      setUser(clientInfo)
    }
  } 

  const imgProofOfPayment =  async () =>{
    const img : arrayImages= await FindImage()
    const imgInfo = img.find(img => img.name === proofOfPaymentPhoto)
    if( imgInfo){
      setImage(imgInfo)
    }
  }

 async function handleCancelProductSale(request: string){

    const deleteProductSale : {error: boolean, message: string } = await DeleteCustomerOrders(paymentId)
   
    if(request === 'cancel'){

      setMessage({
        error: deleteProductSale.error,
        message: deleteProductSale.message,
        active: true
      })
      activateReload()
    }else{
      setMessage({
        error: false,
        message: 'Venda cadastrada com sucesso.',
        active: true
      })
      activateReload()
    }
  }

  async function handleRegisterProductSale() {
    if(user?.name){
      const registeredSales = await CreateRegisteredSales({
        namePhoto:proofOfPaymentPhoto,
        cashPayment: spotPrice,
        deferredPayment: forwardPrice,
        nameUser: user?.name,
        userId: userId,
        paymentId: paymentId,
        orderDate: date,
        title: nameProducts,
        typePurchase: formOfPayment  
      })
      handleCancelProductSale('vender')
    }else{
      setMessage({
        error: true,
        message: 'Error: Comprador não encontrado, esta faltando o nome do comprador,',
        active:true
      })
      setTimeout(() => {
        setMessage({
          error: false,
          message: '',
          active:false
        })
      }, 3000);
    }
  }


  useEffect(()=>{
    client()
    imgProofOfPayment()
  },[])

  
  return (
    <div className='ListCustomeOrder-container'>
        <div className='ListCustomeOrder-show-info-customerOrders'>
          {message.active && (
            <div className='ListCustomeOrder-message'>
              {message.message}
            </div>
          )}
          <div className='ListCustomeOrder-show-info-customerOrders-user'>
              <div className='ListCustomeOrder-show-info-customerOrders-date'>
                {date}
              </div>
              <h2>{user?.name}</h2>
          </div>
           <div className='ListCustomeOrder-show-info-customerOrders-products'>
               <div >
                <h3>Produtos requeridos:</h3>
                  { nameProducts && nameProducts.map(nameProducts => (                   
                        <h4 key={nameProducts}>{nameProducts}</h4>
                    ))}
               </div>
                <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment'>
                  <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment-text'>
                    <h3>Preço total da compra a pagar :</h3>
                    <div>
                     Preço à vista:  {spotPrice} reais
                    </div>
                    {formOfPayment !== 'PIX' && (
                      <div>
                      Preço à prazo:  {forwardPrice} reais
                     </div>
                    )}
                  </div>
                  <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment-text'>
                    <h3>Forma de pagamento :</h3>
                    <div>
                      {formOfPayment}
                    </div>
                  </div>
                  {formOfPayment === 'PIX' && (
                    <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment-img'
                    onClick={() => {
                      if(image?.url){
                        showPixVoucher(image?.url)
                      }
                    }}
                         >
                          <img src={image?.url} alt={proofOfPaymentPhoto}  />
                    </div>
                  )}
                  {!message.active && (
                    <div className='ListCustomeOrder-show-info-customerOrders-buy-button'>
                     <div className='ListCustomeOrder-show-info-customerOrders-buy-button-register'>
                       <button
                       onClick={handleRegisterProductSale}
                       >Registrar venda.</button>
                     </div>
                     <div className='ListCustomeOrder-show-info-customerOrders-buy-button-cancel'>
                       <button
                       onClick={()=> {
                         handleCancelProductSale('cancel')
                       }}
                       >Cancelar venda.</button>
                     </div>
                   </div>
                  )
                   
                  }
                </div>
           </div>
        </div>
    </div>
  )
}

export default ListCustomeOrder