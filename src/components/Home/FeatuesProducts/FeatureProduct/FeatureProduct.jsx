

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeCompare, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'

import React from 'react';
import './FeatureProduct.css'

const FeatureProduct = (props) => {

    const { id, img, img2, title, oldPrice, updatedPrice } = props.data
    return (
        <div className='featuresProductContainer'>
            <div className='featuresImgContainer'>
                <img className='img1' src={img} alt="" />
                <img className='img2' src={img2} alt="" />
            </div>
            <div className='featureTextContainer'>
                <h3>{title}</h3>
                <p>{updatedPrice} {oldPrice}</p>

            </div>



            <div className='iconContainer Compare'>
                <FontAwesomeIcon className='icon Compare' icon={faCodeCompare} />
                <span className='tooltip'>Compare</span>
            </div>
            <div className='iconContainer Eye'>
                <FontAwesomeIcon className='icon Eye' icon={faEye} />
                <span className='tooltip'>Quick view</span>

            </div>
            <div className='iconContainer Heart'>
                <FontAwesomeIcon className='icon Heart' icon={faHeart} />
                <span className='tooltip'>Add to cart</span>
            </div>
            <div className='addToCart'>ADD TO CART</div>
        </div>
    );
};

export default FeatureProduct;