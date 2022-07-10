import './styles.css'

import { FindUsers, User } from '../../services/User'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType } from '../../services/Images'
import { useNavigate } from 'react-router'

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
}


function ListCustomeOrder(data : ListCustomeOrderType){
  const {formOfPayment,
     nameProducts,
     userId,
     proofOfPaymentPhoto,
      spotPrice, 
      forwardPrice,
      createAt,
      showPixVoucher
    } = data

  const [user, setUser]= useState<User>()
  const [image, setImage]= useState<DataImageType>()


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



  useEffect(()=>{
    client()
    imgProofOfPayment()
  },[])

  
  return (
    <div className='ListCustomeOrder-container'>
        <div className='ListCustomeOrder-show-info-customerOrders'>
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
                  <div className='ListCustomeOrder-show-info-customerOrders-buy-button'>
                    <div className='ListCustomeOrder-show-info-customerOrders-buy-button-register'>
                      <button>Registrar venda.</button>
                    </div>
                    <div className='ListCustomeOrder-show-info-customerOrders-buy-button-cancel'>
                      <button>Cancelar venda.</button>
                    </div>
                  </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default ListCustomeOrder