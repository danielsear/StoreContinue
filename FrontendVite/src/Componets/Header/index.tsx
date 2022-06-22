import './styles.css'

import Search from '../../assets/images/search_icon.svg'
import userMenu from '../../assets/images/user-enter1.svg'

import { useEffect, useState } from 'react'
import { FindImage, FindUsers, User } from '../../services/User'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  userId?: string
}

type arrayUsers = User[]

type DataImageType = 	{
  id: string,
  name: string,
  size: number,
  key: string,
  url: string,
  createAt: string,
}
type arrayDataImageType = DataImageType[]

function Header({ userId }: HeaderProps) {
  const [user, setUser] = useState<User | null>()
  const [imageUser, setImageUser] = useState('')
  const navegate = useNavigate()

  async function getUser() {
    const dataUser: arrayUsers = await FindUsers()
    // const userLogged = dataUser.map(data => console.log(data))

    if (dataUser && userId) {
      const userLogged = dataUser.find(data => data.userId === userId)
      setUser(userLogged)
    
      console.log(userLogged);
      
      if(userLogged?.file){
        const dataImage: arrayDataImageType  = await FindImage()

        const imageUserLogged = dataImage.find(data => data.name === userLogged.file)
        console.log(imageUserLogged);
        
        if(imageUserLogged){
          console.log(imageUserLogged.url);
          
          setImageUser(imageUserLogged.url)
        }
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  function LogOut() {
    setUser(null)
    navegate('/')
  }

  return (
    <div id="header_container">
      <section className="logo">Kassinha Variedades</section>
      <section className="pesquisa">
        <div className="search">
          <input type="text" placeholder="  o que você esta procurando?" />
          <button>
            <img src={Search} alt="pesquisa" />
          </button>
        </div>
      </section>
      <section className="user_menu">
        <div className="show_user_info">
          {user ? (
            <div className="user_info">
              <div className='user_info_info'>
              <strong>{user.name}</strong>
                <span>Bem vindo!</span>
                <div className="menu_go_out" onClick={LogOut}>
                  <strong>Sair</strong>
                </div> 
              </div>
              <div className="user_info_img">
                <img src={imageUser} alt={imageUser} />
              </div>     
            </div>
          ) : (
            <a href="/form/login">
              <i>
                <img src={userMenu} alt="Menu do usuário" />
              </i>
              Entrar
            </a>
          )}
        </div>
      </section>
    </div>
  )
}

export default Header
