import './styles.css'

import Search from '../../assets/images/search_icon.svg'
import userMenu from '../../assets/images/user-enter1.svg'

import { ChangeEvent } from 'react'
import {   User } from '../../services/User'


import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  search: (event: ChangeEvent<HTMLInputElement>) => void 
  user?: User | null,
  imageUser?: string,
  reaload?: () => void, 
  codigo?: string
}


function Header({ user ,imageUser , search, reaload, codigo}: HeaderProps) {
  
  const navegate = useNavigate()

  function LogOut() {
    if(reaload){
      reaload()
      navegate('/')
    }
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
            onChange={search} 
            />
            <button >
              <img src={Search} alt="pesquisa" />
            </button>
          </div>
        </section>
      <section className="user_menu">
        <div className="show_user_info">
          {user && user.admin === false && (
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
          ) || !codigo && (
            <a href="/form/login">
              <i>
                <img src={userMenu} alt="Menu do usuário" />
              </i>
              Entrar
            </a>
          ) || codigo === 'true' && (
            <div className='menu-admin'>
              <p>Menu-admin</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Header
