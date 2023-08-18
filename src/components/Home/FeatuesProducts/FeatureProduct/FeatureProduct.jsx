

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeCompare, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'

import React from 'react';
import './FeatureProduct.css'
import { useCartContext } from '../../../../context/Cart_context';
import { Link } from 'react-router-dom';

const FeatureProduct = ({data ,addToCompare}) => {
    const { handleAddToCart } =useCartContext()

    // const { id, img, img2, title, oldPrice, updatedPrice } = props.data
    const {_id , category , title , price , oldPrice , regularPrice , keyFeatures , specificaton , description , reviews , img } =data
    console.log(data ,"data form featurproduct")
    return (
        <div className='featureProductContainer'>
            <div className='featureImgContainer'>

                <img src={`https://digi-storebackend.vercel.app/getimage/${img}`} className='img1' alt="" />
                {/* <img className='img2' src={img2} alt="" /> */}
            </div>
            <div className='featureTextContainer'>
                <h3> <Link className='titleLink' to={`/productdetails/${_id}`}>{title}</Link></h3>
                <p>{price} {oldPrice}</p>


            </div>



            <div className='iconContainer Compare'>
                <FontAwesomeIcon className='icon Compare' icon={faCodeCompare} onClick={()=>addToCompare(_id)} />
                <span className='tooltip' >Compare</span>
            </div>
            {/* <div className='iconContainer Eye'>
                <FontAwesomeIcon className='icon Eye' icon={faEye} />
                <span className='tooltip'>Quick view</span>

            </div> */}
            {/* <div className='iconContainer Heart'>
                <FontAwesomeIcon className='icon Heart'  icon={faHeart} />
                <span className='tooltip'>Add to cart</span>
            </div> */}
            <div className='addToCart'onClick={() => handleAddToCart(_id, title, price, img, 1)}>ADD TO CART</div>
        </div>
    );
};

export default FeatureProduct;