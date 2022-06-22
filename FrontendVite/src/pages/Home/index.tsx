import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../Componets/Footer'
import Header from '../../Componets/Header'

import './styles.css'

function Home() {
  const [products, useProducts] = useState('')
  const { userId } = useParams()

  return (
    <>
      <Header userId={userId} />
      {products ? (
        products
      ) : (
        <div className="menu_none">
          <h1>Não há produtos cadastrados.</h1>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Home
