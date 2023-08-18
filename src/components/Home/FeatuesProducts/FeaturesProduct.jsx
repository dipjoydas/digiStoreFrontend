import React, { useEffect, useState } from 'react';
// import FeaturesProducts from '../../featuresProducts.json'
import FeatureProduct from './FeatureProduct/FeatureProduct';
import './FeaturesProducts.css'
import Product from '../../Products/Product/Product';
import { useCompareContext } from '../../../context/Compare_context';
import useAnimate from './useAnimate';

const FeaturesProduct = () => {
    useAnimate()

    const [featuresProducts, setFeaturesProducts] = useState([])
    const { addToCompare } = useCompareContext()

    useEffect(() => {
        fetch('https://digi-storebackend.vercel.app/featuresproduct')
            .then(response => response.json())
            .then(data => setFeaturesProducts(data))
    }, [])


    return (
        <div>
            <div className='featuresProductsContainer'>
                <h1>Features products </h1>
                <div className='featuresProducts'>
                    {/* {featuresProducts.map((product, index) => <Product key={index} data={product} addToCompare={addToCompare}></Product>)} */}
                    {featuresProducts.map((product,index)=><FeatureProduct key={index} data={product} addToCompare={addToCompare}></FeatureProduct>)}
                </div>

            </div>
        </div>
    );
};

export default FeaturesProduct;