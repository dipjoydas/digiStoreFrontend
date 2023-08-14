import React, { useEffect, useState } from 'react';
import HomeSlider from './HomeSlider';
import './home.css'
import useSlider from './useSlider';
import FeaturedCategory from './FeaturedCategory/FeaturedCategory';
import FeaturesProduct from './FeatuesProducts/FeaturesProduct'



const Home = () => {
    const [images, setImages] = useState([])
    const [category, setCategory] = useState([])
    const [featuredImages, setFeaturedImages] = useState()
    useEffect(() => {

        fetch('https://digi-storebackend.vercel.app/homeslider')
            .then(response => response.json())
            .then(data => setImages(data))

        fetch('https://digi-storebackend.vercel.app/featurescategory')
            .then(response => response.json())
            .then(data => setCategory(data))

        // fetch('https://digi-storebackend.vercel.app/featuredimages')
        //     .then(response => response.json())
        //     .then(data => setFeaturedImages(data))





    }, [])
    useEffect(() => {

    }, [images])
    useSlider(images)

    return (
        <div>


            <div className='homeBanner'>
                <div className='homeSlider'>
                    {images.map((img, index) => <HomeSlider key={index} data={img}></HomeSlider>)}

                </div>
                <div className='compares'>
                    {/* <div className='inputContainer'>
                        <h4>Comare Product</h4>
                        <p>Compre two products</p>
                        <input className='compare'  type="text" name="" id="" placeholder='Search and Select Product' /><br />
                        <input className='compare' type="text" name="" id="" placeholder='Search and Select Product' /><br />
                        <input className='compreSubmit' type="submit" value="View Comparision" />
                    </div> */}
                    {/* <div className='subBanner'>
                        {
                            featuredImages?.map((item,index)=><> 
                            {console.log(item,'featured images id checking')}
                            <img src={`https://digi-storebackend.vercel.app/getfeaturedimage/${item}`} alt="" /></>)
                        }
                    </div> */}


                </div>


            </div>
            {/*-------------------------------------------- feature products  part -------------------------------------------- */}

            <div className='featuresCategories'>
                <h2>Featured Category</h2>
                <p>Get your desired product from here </p>
                <div className='featuresCategoryContainer'>
                    {
                        category.map((category, index) => <FeaturedCategory key={index} data={category}></FeaturedCategory>)
                    }

                </div>
            </div>


            <FeaturesProduct></FeaturesProduct>

            {/* <AddToCart></AddToCart> */}






        </div>
    );
};

export default Home;