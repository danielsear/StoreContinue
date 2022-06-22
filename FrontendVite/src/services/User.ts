export type User = {
  userId: string
  id?: string
  name: string
  email: string
  password: string
  admin?: boolean
  file?: string
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

async function CreateUser(user: User) {
  const { userId, name, email, password, admin, file } = user

  await fetch('http://localhost:3333/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, name, email, password, admin, file })
  })
    .then()
    .catch(err => console.error(err))
}

async function FindUsers() {
  return await fetch('http://localhost:3333/users', {
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

async function FindOneUsers(userId: string) {
  return await fetch(`http://localhost:3333/${userId}`, {
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

export { CreateUser, FindUsers, FindOneUsers,FindImage }
