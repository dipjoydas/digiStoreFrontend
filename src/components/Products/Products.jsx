import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Product from './Product/Product';
import './products.css'
import { useCompareContext } from '../../context/Compare_context';

const Products = () => {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(10)
    const [skip, setSkip] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const location = useLocation()
    
    const { addToCompare } = useCompareContext()
    const params = useParams()
   
    // set show ----------------------------------------------------------------
    const setSkipValue = () => {
        const dropdown = document.getElementById('dropdown');

        
        dropdown?.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
          setShow(selectedValue)
         
        });
        return ()=>{dropdown.removeEventListener()}
    }
    setSkipValue()
    useEffect(() => {
        const modifiedPathName = location.pathname.toString().slice(11)
        fetch(`https://digi-storebackend.vercel.app/getproducts${modifiedPathName}${location.search}?show=${show}&skip=${skip}`).
            then(res => res.json()).
            then(data => {
                setProducts(data.product)
                const page = Math.ceil(data.count / show)
                setPageCount(page)
            })
    }, [show, skip,params])
  
    return (<div style={{background:"#F2F4F8"}}>
        {/*-------------------------------------------------- sorting products ------------------------------------------- */}
        <div className='soringContainer'>
            <div>
            <label for="dropdown">show:</label>
            <select id="dropdown">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>

            </select>
            </div>

        </div>
        <div className='productsContainer'>

            {/* --------------------------------------------------------------------------------------------------------------- */}
            {
                products.map(product => <Product key={product._id} data={product} addToCompare={addToCompare}></Product>)
            }



        </div>
        <div className='pagination'>
            {
                [...Array(pageCount).keys()].map(number => <button className={number == skip ? 'selected' : ''} onClick={() => setSkip(number)}>{number}</button>)
            }

        </div>

    </div>

    );
};

export default Products;