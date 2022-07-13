
import { useEffect, useState } from 'react'
import { FindImage,DataImageType } from '../../services/Images'

import './styles.css'

type ListRegisteredSalesType ={
  title: string[],
  typePurchase: string,
  cashPayment?: string,
  deferredPayment?: string,
  namePhoto?: string,
  paymentId: string,
  userId: string,
  nameUser?: string,
  orderDate: string,
  createAt: string,
  showPixVoucher: (event: string) => void
}

type arrayImages = DataImageType[]


function ListRegisteredSales(data:ListRegisteredSalesType){
  const {
    orderDate,
    paymentId,
    title,
    typePurchase,
    userId,
    cashPayment,
    deferredPayment,
    namePhoto,
    nameUser,
    createAt,
    showPixVoucher
  }= data
 
  const [image, setImage] =useState<DataImageType>()

  const d = new Date(createAt);
  const date = d.toLocaleDateString("pt-br", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const imgProofOfPayment =  async () =>{
    const img : arrayImages= await FindImage()
    const imgInfo = img.find(img => img.name === namePhoto)
    if( imgInfo){
      setImage(imgInfo)
    }
  }
  
  
  useEffect(()=>{
    imgProofOfPayment()
  },[])

  return (
  
      <div className='ListRegisteredSales-box-card'>
          <table>
            <thead>
              <tr>
                <th>{paymentId}</th>
                <th>{orderDate}</th>
                <th>{date}</th>
                <th>{nameUser}</th>
                <th>{title && title.map(name =>(
                  <div key={name}>
                    {name}
                  </div>
                ))}</th>
                <th>{typePurchase}</th>
                {namePhoto ? <th className='th-pix' onClick={() => {
                  if(image){
                    showPixVoucher(image?.url)
                  }
                }}>Comprovante Pix</th> : <th>{deferredPayment} reais</th>}
              </tr>
            </thead>
          </table>
      </div>
  )
}

export default ListRegisteredSales