import './styles.css'

import { useEffect, useState } from 'react'
import { FindImage, DataImageType} from '../../services/Images'
import { DeleteProduct} from '../../services/Products'

import FormCardEdit from '../FormCardEdit'

import editProduct from '../../assets/images/edit.svg'
import deleteProduct from '../../assets/images/delete-product.svg'
import like from '../../assets/images/like.svg'




type arrayImage = DataImageType[]

type UserProduct = {
  title: string,
  frete?:string,
  spotPrice:string,
  namePhoto?: string,
  forwardPrice: string,
  pricePrevious: string,
  productId?: string,
  admin?: boolean,
  userLogged?: string,
  group: string
  ativeReload: () => void
  addProduct?: () => void
}



function CardProducts({
  forwardPrice,
  namePhoto,
  spotPrice,
  title, 
  pricePrevious,
  frete, 
  productId,
  admin,
  userLogged,
  group,
  addProduct,
  ativeReload
} : UserProduct){
  const [img, setImg] = useState<DataImageType>()
  const [editFildProduct, setEditFildProduct] = useState(true)
  const [disableButtonAddProduct,setTisableButtonAddProduct] = useState(false)

  
  async function ShowImage(){
    const arrayImg : arrayImage = await FindImage()
    const img = arrayImg.find(img => img.name === namePhoto)
  
    setImg(img)
  }

  async function handleDeleteProduct(){
    if(productId){
      const deleteProduct = await DeleteProduct(productId)
      ativeReload()
      /*error ao deletar imagem
        if(namePhoto){
        const deleteImage = await DeleteImage(namePhoto)
      }
      */
    }
  }


  async function handleMarkLike(){
   // const infoUsersLogged : arrayUsers = await FindUsers()
   // const infoUserLogged = infoUsersLogged.find(user => user.userId === userLogged)
   // infoUserLogged?.likeProducts?.push(title)
   // 
   // if(infoUserLogged){
   //   const updateUserProductlike = await UpdateUser(infoUserLogged)
   //   console.log(updateUserProductlike);
   // }
   console.log('Like!');
   
    
  }

  function onclickAddProduct(){
    setTisableButtonAddProduct(true)
    if(addProduct){
      addProduct()
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
              {userLogged && (
                <div className='card-description-options-like'>
                  <img id='likeImage' src={like} alt={like} onClick={handleMarkLike}/>
                </div>
              )}
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
          {userLogged && (
            <div className='card-buy-products'>
               {!disableButtonAddProduct &&  <button className='card-button-add-product'
                onClick={onclickAddProduct}>Adicionar ao carrinho</button>}
            </div>
          )}
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
            group={group}
          />
        </div>
      )}
   
    </div>
  )
}

export default CardProducts