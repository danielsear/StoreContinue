import './styles.css'

import {CustumerOdersType} from '../../services/CustomerOrders'
import { FindUsers, User } from '../../services/User'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType } from '../../services/Images'

type arrayUser = User[]
type arrayImages = DataImageType[]


function ListCustomeOrder(data : CustumerOdersType){
  const {formOfPayment, nameProducts,paymentId,userId,proofOfPaymentPhoto} = data

  const [user, setUser]= useState<User>()
  const [image, setImage]= useState<DataImageType>()


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
          <div>
              <h2>{user?.name}</h2>
          </div>
           <div className='ListCustomeOrder-show-info-customerOrders-products'>
               <div >
                <h3>Produtos requeridos:</h3>
                  { nameProducts && nameProducts.map(nameProducts => (                   
                        <h4>{nameProducts}</h4>
                    ))}
               </div>
                <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment'>
                  <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment-text'>
                    <h3>Forma de pagamento :</h3>
                    <div>
                      {formOfPayment}
                    </div>
                  </div>
                  <div className='ListCustomeOrder-show-info-customerOrders-formOfPayment-img'>
                      <img src={image?.url} alt={proofOfPaymentPhoto} />
                  </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default ListCustomeOrder