import React, { useEffect, useState } from 'react'


import { FindProducts, ProductsType } from '../services/Products'

type arrayProducts = ProductsType[]


export const AuthContext = React.createContext({})

export const AuthProvider = (props : any) => {
  const [products, setProducts] = useState<arrayProducts>([])

  async function getProducts(){
    const products : arrayProducts | {message: string}= await FindProducts()
    const arrayProducts = products as arrayProducts
    setProducts(arrayProducts)
  }
  
  useEffect(()=>{
    getProducts()
  },[])

  return (
    <AuthContext.Provider  value= {[products]}>
      {props.children}
    </AuthContext.Provider>
  )
}