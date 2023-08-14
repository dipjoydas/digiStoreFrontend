import React from 'react';
import './featuredCategory.css'
import { Link } from 'react-router-dom';

const FeaturedCategory = (props) => {
    const {des,img,url} =props.data
    return (
        
            <div className='category'>
            <img src={`http://localhost:5000/getfcimage/${img}`} alt="" />
            <p><Link to={`categories/${url}`}>{des}</Link> </p>
            
        </div>
        
    );
};

export default FeaturedCategory;