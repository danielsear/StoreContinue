
export type CustumerOdersType = {
  nameProducts: Array<string>,
  userId: string,
  proofOfPaymentPhoto?: string,
  formOfPayment: string,
  paymentId: string,
  spotPrice:string,
  forwardPrice?: string,
  createAt: string,
  
}
export type CustumerOderType = {
  nameProducts: Array<string>,
  userId: string,
  proofOfPaymentPhoto?: string,
  formOfPayment: string,
  paymentId: string,
  spotPrice:string,
  forwardPrice?: string,
}

export type DataPaymentType = {
  error: boolean,
  message: string
}

async function CreateCustomerOrders(custumerOders:CustumerOderType) : Promise<DataPaymentType> {
  const {formOfPayment,proofOfPaymentPhoto,userId,nameProducts,paymentId,spotPrice,forwardPrice } = custumerOders
 return  await fetch(`http://localhost:3333/customerOrders-create`,{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({formOfPayment,proofOfPaymentPhoto,userId,nameProducts,paymentId, spotPrice, forwardPrice})
  })
  .then(res => res.json())
  .then(data => {
    return data
  })
  .catch(err => console.error(err))
}

async function FindCustumerOrders() {
 return await fetch('http://localhost:3333/customerOrders-list',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    return data
  })
  .catch(err => console.error(err))
}

export { CreateCustomerOrders ,  FindCustumerOrders}