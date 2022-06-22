import './styles.css'

import { v4 } from 'uuid'

import { useNavigate } from 'react-router-dom'
import userDefault from '../../assets/images/user-enter1.svg'

import { ChangeEvent, FormEvent, useState } from 'react'

import { CreateUser } from '../../services/User'

function FormCreateUser() {
  const navegate = useNavigate()
  const [messageError, setMessageError] = useState('')
  const [image, setImage] = useState<File>()

  const [user, setUser] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    file: '',
    admin: false
  })

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    const userId = v4()
      
    const formData = new FormData()
    if(image){
     formData.append('file', image)

     await fetch('http://localhost:3333/image', {
      method: 'POST',
      body: formData
    })
      .then(res =>{
        console.log(res);
      })
      .catch(err => console.error(err))
  
      
    }
   
   
     if (user) {
      if (user.email && user.name && user.password && user.admin) {
        if (user.name === 'daniel') {
          CreateUser({
            userId: userId,
            name: user.name,
            email: user.email,
            password: user.password,
            file: image?.name,
            admin: true
          })
          navegate(`/${userId}`)
        }
        CreateUser({
          userId: userId,
          name: user.name,
          email: user.email,
          password: user.password,
          file: image?.name,
          admin: user.admin
        })
        navegate(`/${userId}`)
      }
      CreateUser({
        userId: userId,
        name: user.name,
        email: user.email,
        password: user.password,
        file: image?.name,
      })
      navegate(`/${userId}`)
    }
 
  }

  return (
    <div className="form_container">
      <div className="form_header">Kassinha Variedades</div>
      <h2>Create Login:</h2>
      <div className="form_quadro">
        <form className="form_Cadastro" onSubmit={handleSubmit} encType='multipart/form-data'>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onChange={handleUser}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={handleUser}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={handleUser}
              required
            />
          </div>
          <div>
            <label htmlFor="file">Carregar imagem:</label>
            <input
              type="file"
              name="image"
              onChange={e => {
                const data = e.target.files
                if (data) {
                  setImage(data[0])
                }
              }}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <div className="show-image">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Image"
              width="300"
              height="300"
            />
          ) : (
            <img
              src={userDefault}
              alt="Image"
              width="300"
              height="300"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FormCreateUser

