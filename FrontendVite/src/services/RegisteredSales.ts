
export type RegisteredSalesType ={
  title: string[],
  typePurchase: string,
  cashPayment?: string,
  deferredPayment?: string,
  namePhoto?: string,
  paymentId: string,
  userId: string,
  nameUser?: string,
  orderDate: string,
  createAt?: string
}
    

async function CreateRegisteredSales(data:RegisteredSalesType): 
Promise<{ error: boolean,message: string}> {
  const {
    cashPayment,
    deferredPayment,
    namePhoto,
    nameUser,
    paymentId,
    title,
    typePurchase,
    userId,
    orderDate
  } = data

  return await fetch('http://localhost:3333/registeredSales-create',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cashPayment,
      deferredPayment,
      orderDate,
      namePhoto,
      nameUser,
      paymentId,
      title,
      typePurchase,
      userId
    })
  }).then(res => res.json())
  .then(data =>{
    return data
  })
  .catch(err => console.error(err))
}

async function FindRegisteredSales() {
  return await fetch('http://localhost:3333/registeredSales-list',{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(data =>{
    return data
  })
  .catch(err => console.error(err))
}


export {CreateRegisteredSales,FindRegisteredSales }