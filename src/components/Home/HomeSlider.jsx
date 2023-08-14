import React from 'react';
import './homeSlider.css'

const HomeSlider = ({data}) => {
   
    return (
        <div className='slider'>
            <img src={"http://localhost:5000/getsliderimage/" + data} alt="" />

            
        </div>
    );
};

export default HomeSlider;