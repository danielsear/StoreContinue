import './styles.css'

import {CustumerOdersType} from '../../services/CustomerOrders'
import { FindUsers, User } from '../../services/User'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType } from '../../services/Images'

type arrayUser = User[]
type arrayImages = DataImageType[]


function ListCustomeOrder(data : CustumerOdersType){
  const {formOfPayment, nameProducts,paymentId,userId,proofOfPaymentPhoto, spotPrice, forwardPrice,createAt} = data

  const [user, setUser]= useState<User>()
  const [image, setImage]= useState<DataImageType>()
  const [showImage, setShowImage]= useState(false)
  

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

  function handleShowPhoto(){
    if(!showImage){
      const fild = document.querySelector('.ListCustomeOrder-show-info-customerOrders-formOfPayment-img')
      fild?.classList.remove('ListCustomeOrder-show-info-customerOrders-formOfPayment-img')
      fild?.classList.add('showPhoto')
      setShowImage(prev => !prev)
    }else{
      const fild = document.querySelector('.showPhoto')
      fild?.classList.remove('showPhoto')
      fild?.classList.add('ListCustomeOrder-show-info-customerOrders-formOfPayment-img')
      setShowImage(prev => !prev)
    }
    console.log(showImage);
    
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
                     Preço à vista:  {spotPrice}
                    </div>
                    {formOfPayment !== 'PIX' && (
                      <div>
                      Preço à prazo:  {forwardPrice}
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
                    onClick={handleShowPhoto}
                    >
                       <img src={image?.url} alt={proofOfPaymentPhoto}  />
                    </div>
                  )}
                </div>
           </div>
        </div>
    </div>
  )
}

export default ListCustomeOrder