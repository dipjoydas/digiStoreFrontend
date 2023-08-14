import React from 'react';
import './homeSlider.css'

const HomeSlider = ({data}) => {
   
    return (
        <div className='slider'>
            <img src={"https://digi-storebackend.vercel.app/getsliderimage/" + data} alt="" />

            
        </div>
    );
};

export default HomeSlider;