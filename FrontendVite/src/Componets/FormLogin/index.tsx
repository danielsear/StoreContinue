import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FindUsers, User } from '../../services/User'
import './styles.css'

type arrayUsers = User[]

function FormLogin() {
  const [meassage, setMessage] = useState('')
  const navegate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function LoggingInUser(event: FormEvent) {
    event.preventDefault()

    if (user) {
      const dataUser: arrayUsers = await FindUsers()
      const userLogged = dataUser.find(
        data =>
          data.email === user.email &&
          data.password === user.password &&
          data.name === user.name
      )

      if (!userLogged) {
        setMessage('Usuário Inválido.')
        return
      }
      navegate(`/${userLogged?.userId}`)
    }
  }

  return (
    <div className="form_container">
      <div className="form_header">Kassinha Variedades</div>
      {meassage && <h2 className="message_error">{meassage}</h2>}
      <h2>Login:</h2>
      <form className="form_Cadastro" onSubmit={LoggingInUser}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="name"
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
        <button type="submit">Entrar</button>
      </form>
      <p>
        Você não possui cadastro?{' '}
        <a href="/form/create-login">Criar cadastro</a>
      </p>
    </div>
  )
}

export default FormLogin
