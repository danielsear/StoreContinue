import './styles.css'

import Search from '../../assets/images/search_icon.svg'
import userMenu from '../../assets/images/user-enter1.svg'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {  FindUsers, User } from '../../services/User'
import { FindImage, DataImageType } from '../../services/Images'

import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  userId?: string,
  search: (event: string) => void 
}

type arrayUsers = User[]


type arrayDataImageType = DataImageType[]

function Header({ userId , search}: HeaderProps) {
  const [user, setUser] = useState<User | null>()
  const [imageUser, setImageUser] = useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')


  const navegate = useNavigate()

  async function getUser() {
    const dataUser: arrayUsers = await FindUsers()
    // const userLogged = dataUser.map(data => console.log(data))

    if (dataUser && userId) {
      const userLogged = dataUser.find(data => data.userId === userId)
      setUser(userLogged)
      
      if(userLogged?.file){
        const dataImage: arrayDataImageType  = await FindImage()

        const imageUserLogged = dataImage.find(data => data.name === userLogged.file)
        
        if(imageUserLogged){
          setImageUser(imageUserLogged.url)
        }
      }
    }
  }

  function handleSearchInputValue(event : ChangeEvent<HTMLInputElement>){
    setInputSearchValue(event.target.value)
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
            <input 
            type="text"  
            name='search' 
            placeholder="  o que você esta procurando?"
            onChange={handleSearchInputValue} 
            />
            <button onClick={()=> { 
              if(inputSearchValue){ 
                search(inputSearchValue)
              }}}>
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
