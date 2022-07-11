import './styles.css'


import { RegisterImage} from '../../services/Images'
import {  ProductsType, UpdateProduct} from '../../services/Products'


import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

type arrayProducts = ProductsType[]

type FormCardEditType = {
  title: string;
  frete?: string | undefined;
  spotPrice: string;
  namePhoto?: string | undefined;
  forwardPrice: string;
  pricePrevious: string;
  productId?: string | undefined;
  admin?: boolean | undefined;
  userLogged?: string | undefined;
  group: string;
  activeReload : () => void
}

function FormCardEdit({
  forwardPrice,
  namePhoto,
  spotPrice,
  title, 
  pricePrevious,
  frete, 
  productId,
  group,
  activeReload
}: FormCardEditType){
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
    group: '',
})


  function handleProduct(event : ChangeEvent<HTMLInputElement>){
    setProduct({...product, [event.target.name]: event.target.value})
  }

  async  function handleSubmit(event: FormEvent){
    event.preventDefault()

    /*
      Deletar a imagem ja existente, so que agora esta dando error
    */

    const formData = new FormData()
    if(img){
      formData.append('file', img)

      const respo = await RegisterImage(formData)
    }

    if(product){
      const resp = await UpdateProduct({
        namePhoto: img?.name,
        pricePrevious: product.pricePrevious,
        spotPrice: product.spotPrice,
        title: product.title,
        forwardPrice: product.forwardPrice,
        frete: product.frete,
        productId: productId,
        group: product.group
      })
      setMessage('Produto editado com sucesso.')
      activeReload()
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
              src="#"
              alt={namePhoto}
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
     <div className='form-card-frete'>
        <label >Grupo:</label>
        <input type="text" name='group'onChange={handleProduct} placeholder={group}/>
        </div>
     <div className='form-card-description-name'>
        <label >Titulo:</label>
        <input type="text" name='title' onChange={handleProduct} placeholder={title}/>
        </div>
      <div className='form-card-price-previous'>
      <label >Preço anterior:</label>
        <input type="text" name='pricePrevious'onChange={handleProduct} placeholder={pricePrevious}/>
        </div>
      <div className='form-card-price-current'>
        <label >Preço à vista:</label>
        <input type="text" name='spotPrice'onChange={handleProduct} placeholder={spotPrice}/>
        </div>
      <div className='form-card-price-installment'>
        <label >Preço a prazo:</label>
         <input type="text" name='forwardPrice'onChange={handleProduct} placeholder={forwardPrice}/>
        </div>
        <div className='form-card-button'>
         <button type='submit'>Editar Produto</button>
        </div>
     </div>
    </form>
      </>
  )
}

export default FormCardEdit