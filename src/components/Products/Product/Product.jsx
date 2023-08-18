import React from 'react';
import { Link } from 'react-router-dom';
import './product.css'
import { useCompareContext } from '../../../context/Compare_context';
import { useCartContext } from '../../../context/Cart_context';

const Product = ({data ,addToCompare}) => {
    // const {addToCompare} =useCompareContext()
    // console.log(addToCompare,'addto compare ')
    // console.log(props,'data')
    const { handleAddToCart } = useCartContext()
   
    const {_id , category , title , price , oldPrice , regularPrice , keyFeatures , specificaton , description , reviews , img } =data
   
    
    return (
        <div className='productContainer'>
            <div className='imgContainer'>
                <img src={`https://digi-storebackend.vercel.app/getimage/${img}`} alt="" />
                

            </div>
            <h3>
                <Link to={`/productdetails/${_id}`}>{title}</Link>
            </h3>
            <div className='keyFeatureContainer'>
                <ul>
                    
                    {
                        
                        keyFeatures?.map(i=><li>
                            {
                                i.split('*')[0] 
                            }
                            :
                            {
                                i.split('*')[1] 
                            }
                        </li>)
                    }
                </ul>
                <ul>
                   
                </ul>

            </div>
            <div className='priceContainer'>
                <span>{price}$</span>
                <span>{oldPrice?oldPrice:''}$</span>
                
            </div>
            <div className='actionContainerCoverer'>

            </div>
            <div className='actionContainer'>
                <span onClick={() => handleAddToCart(_id, title, price, img, 1)}>Add to cart</span> <br />
                <span onClick={()=>addToCompare(_id)}>Add to compare</span>

            </div>

            
        </div>
    );
};

export default Product;