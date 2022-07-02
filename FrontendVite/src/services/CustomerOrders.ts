
export type CustumerOdersType = {
  nameProducts: Array<string>,
  userId: string,
  proofOfPaymentPhoto: string,
  pormOfPayment: string,
  paymentId: string,
}

export type DataPaymentType = {
  error: boolean,
  message: string
}

async function CreateCustomerOrders(custumerOders:CustumerOdersType) : Promise<DataPaymentType> {
  const {pormOfPayment,proofOfPaymentPhoto,userId,nameProducts,paymentId} = custumerOders
 return  await fetch(`http://localhost:3333/customerOrders-create`,{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({pormOfPayment,proofOfPaymentPhoto,userId,nameProducts,paymentId})
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