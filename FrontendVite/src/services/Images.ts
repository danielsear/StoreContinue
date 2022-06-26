

 export type DataImageType = {
  name: string,
  size: number,
  key: string,
  url: string
 }

async function FindImage() {
  return await fetch('http://localhost:3333/images', {
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

async function RegisterImage(formData: FormData) {
  
await fetch('http://localhost:3333/image', {
  method: 'POST',
  body: formData
})
  .then(res =>{
    console.log(res);
  })
  .catch(err => console.error(err))
}

async function DeleteImage(name:string) {
  await fetch(`http://localhost:3333/delete-product/${name}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then().catch(err=> console.error(err))
}



export{  FindImage, RegisterImage, DeleteImage}