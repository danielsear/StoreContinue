import './styles.css'

import {v4} from 'uuid'
import { RegisterImage} from '../../services/Images'
import { CreateProduct, ProductsType} from '../../services/Products'
import productDefault from '../../assets/images/product_searching_icon_181876.svg'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

type arrayProducts = ProductsType[]
type formcardType = {
  ativeReload: () => void,
}

function FormCard({ativeReload} : formcardType){
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [img, setImg] = useState<File>()
  const [product, setProduct] = useState({
    title: '',
    frete: '',
    spotPrice: '',
    forwardPrice: '',
    namePhoto: '',
    pricePrevious: '',
    id: '' ,
})


  function handleProduct(event : ChangeEvent<HTMLInputElement>){
    setProduct({...product, [event.target.name]: event.target.value})
  }

  async  function handleSubmit(event: FormEvent){
    event.preventDefault()

    const formData = new FormData()
    if(img){
      formData.append('file', img)

      const respo = await RegisterImage(formData)
    }

    if(product){
    const id = v4()
      const resp = await CreateProduct({
        namePhoto: img?.name,
        pricePrevious: product.pricePrevious,
        spotPrice: product.spotPrice,
        title: product.title,
        forwardPrice: product.forwardPrice,
        frete: product.frete,
        productId: id 
      })
      setMessage('Produto cadastrado com sucesso.')
    }

  }



  return (
      <>
        {message && <span className='form-card-message'>{message}</span>}
        <form className='form-card-container' onSubmit={handleSubmit}>
      <div className='form-card-image'>
      <div className="form-show-image">
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              alt="Image"
              width="300"
              height="300"
            />
          ) : (
            <img
              src={productDefault}
              alt="Image"
              width="300"
              height="300"
            />
          )}
        </div>
        <input type='file' name='file' onChange={(event)=> {
          const files = event.target.files
          if(files){
            const file = files[0]
            setImg(file)
          }
        }}/>
      </div>
     <div className='form-card-description'>
     <div className='form-card-description-name'>
        <label >Titulo:</label>
        <input type="text" name='title' onChange={handleProduct}/>
        </div>
      <div className='form-card-frete'>
        <label >Frete:</label>
        <input type="text" name='frete'onChange={handleProduct}/>
        </div>
      <div className='form-card-price-previous'>
      <label >Preço anterior:</label>
        <input type="text" name='pricePrevious'onChange={handleProduct}/>
        </div>
      <div className='form-card-price-current'>
        <label >Preço à vista:</label>
        <input type="text" name='spotPrice'onChange={handleProduct}/>
        </div>
      <div className='form-card-price-installment'>
        <label >Preço a prazo:</label>
         <input type="text" name='forwardPrice'onChange={handleProduct}/>
        </div>
        <div className='form-card-button'>
         <button type='submit' onClick={ativeReload} >Criar Produto</button>
        </div>
     </div>
    </form>
      </>
  )
}

export default FormCard