import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './order.css'

const Orders = () => {
   
    const [orders ,setOrders] =useState([])
  
    // now find orders of user 
    useEffect(()=>{
        const Authentication = JSON.parse(localStorage.getItem("token"))
        const getOrders = async()=>{
            const res = await fetch('http://localhost:5000/orders',{
                method:"GET",
                headers: {
                    "Authentication": Authentication
                }
            })
            const result = await res.json()
            setOrders(result)
            
            
        
           }
           getOrders()

    },[])
   
    return (
        <div className='orderContainer'>
            {!orders.length && <h1>There is not any unpaid orders</h1>}
            {orders?.map((order,index)=><div key={index} className='order'>
                <div className='imgContainer'>
                {/* <img src={"http://localhost:5000/getimage/" + order.img} alt="" /> */}

                </div>
                {order.orders.map(product=><>
                <h4>{product.title}</h4>
                </>)}
                <button><Link className='link' to={`/payment/${order._id}`}>Pay</Link></button>
                {/* <h4>{order.orders.title}</h4> */}
            </div>)}
        </div>
    );
};

export default Orders;