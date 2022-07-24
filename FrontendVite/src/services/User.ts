export type User = {
  userId: string
  id?: string
  name: string
  email: string
  password: string
  admin?: boolean
  file?: string,
  likeProducts?: Array<string>
}



async function CreateUser(user: User) {
  const { userId, name, email, password, admin, file, likeProducts} = user

 return await fetch('http://localhost:3333/user-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, name, email, password, admin, file, likeProducts })
  })
    .then()
    .catch(err => console.error(err))
}

async function FindUsers() {
  return await fetch("http://localhost:3333/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(err => console.error(err))
}

async function UpdateUser(data: User) {
  const { userId, name, email, password, admin, file, likeProducts}  = data

 return await fetch('http://localhost:3333/user-update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, name, email, password, admin, file, likeProducts} )
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(err => console.error(err))
}


export { CreateUser, FindUsers, UpdateUser }
