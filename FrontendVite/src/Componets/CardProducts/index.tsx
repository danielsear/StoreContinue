import './styles.css'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType, DeleteImage} from '../../services/Images'
import { DeleteProduct, ProductsType} from '../../services/Products'

import FormCardEdit from '../FormCardEdit'

import editProduct from '../../assets/images/edit.svg'
import deleteProduct from '../../assets/images/delete-product.svg'


type arrayImage = DataImageType[]


function CardProducts({
  forwardPrice,
  namePhoto,
  spotPrice,
  title, 
  pricePrevious,
  frete, 
  productId,
  admin
} : ProductsType){
  const [img, setImg] = useState<DataImageType>()
  const [editFildProduct, setEditFildProduct] = useState(true)
  const [product, setProduct] = useState<ProductsType>()

  
  async function ShowImage(){
    const arrayImg : arrayImage = await FindImage()
    const img = arrayImg.find(img => img.name === namePhoto)
  
    setImg(img)
  }

  async function handleDeleteProduct(){
    if(productId){
      const deleteProduct = await DeleteProduct(productId)
      /*error ao deletar imagem
        if(namePhoto){
        const deleteImage = await DeleteImage(namePhoto)
      }
      */
    }
  }

 

  useEffect(()=>{
    ShowImage()
  },[])

  return (
    <div className='init-card-container'>
      {editFildProduct ? (
          <div className='card-container'>
          <div className='card-image'>
            <img src={img?.url} alt={img?.name}/>
          </div>
          <div className='card-description-settings'>
            <div className='card-description-name'>
              {title}
            </div>
            <div className='card-description-options'>
             {admin && (
              <>
                <div className='editProduct'>
                 <img src={editProduct} alt="edit" 
                 onClick={() => setEditFildProduct(prev => !prev)}
                 />
                </div>
                <div className='deleteProduct' onClick={handleDeleteProduct}>
                  <img src={deleteProduct} alt="delete" />
                </div>
              </>
             )}
            </div>  
          </div>
          {frete && <p className='card-frete'>Frete : R$ {frete} reais</p>}
          <div className='card-price-previous'>Preço anterior :  R$ {pricePrevious} reais</div>
          <div className='card-price-current'>Preço à vista :  R$ {spotPrice} reais</div>
          <div className='card-price-installment'>ou até 3x de R$ {forwardPrice} reais sem juros</div>
        </div>
      ) : (
        <div className=''>
          <FormCardEdit 
            forwardPrice={forwardPrice}
            namePhoto={namePhoto}
            spotPrice={spotPrice}
            title={title}
            pricePrevious={pricePrevious}
            frete={frete}
            productId={productId}
          />
        </div>
      )}
   
    </div>
  )
}

export default CardProducts