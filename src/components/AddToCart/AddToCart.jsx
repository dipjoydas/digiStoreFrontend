import React, { useEffect, useState } from 'react';
import './addToCart.css'
import { useCartContext } from '../../context/Cart_context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'

const AddToCart = ({ hideCart }) => {
    const { displayCart, setDisplayCart, handleRemoveFromCart } = useCartContext()
    const [cart, setCart] = useState({})

    const [total, setTotal] = useState()
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (Boolean(cart)) {
            const cartValue = JSON.parse(cart)
            setCart(cartValue)
        }

    }, [])
    //------------------------------------------ get added product in cart ----------------------------------------------------------
    useEffect(() => {
        const itemKeys = Object.keys(cart)
        const newProudctArray = [...displayCart]
        itemKeys.map(async (key) => {
            const res = await fetch(`http://localhost:5000/product/${key}`)
            const result = await res.json();
            const { _id, title, price, img } = result
          
            const quantity = cart[key]
            const product = {
                id: _id,
                title,
                price,
                quantity,
                img
            }
            newProudctArray.push(product)

            setDisplayCart([...newProudctArray])




        })



    }, [cart])
    useEffect(() => {
   

    }, [displayCart])
    // -------------------------------------------------------------------------------set total ----------------------------------------------------
    useEffect(() => {
        let sum = 0

        for (const i of displayCart) {
            sum = sum + (i.price * i.quantity)

        }
        setTotal(sum)
    }, [displayCart])



    return (
        <div className='addtoCartContainer'>
            <div className='cartHeading'>
                <h3>Your Cart</h3>

                <div className='hideCart' onClick={hideCart}> <FontAwesomeIcon icon={faXmark} /></div>
            </div>

            {
                displayCart.map((product, index) => <div key={index} className='cartItem'>
                    <img src={`http://localhost:5000/getimage/${product.img}`} alt="" />
                    <div>
                        <h6>{product.title}</h6>
                        {product.price} x {product.quantity} = {+product.price * +product.quantity}
                    </div>
                    <div>
                        <FontAwesomeIcon className='deleteIcon' icon={faTrashCan} onClick={() => handleRemoveFromCart(product.id)} />
                    </div>


                </div>)
            }
            <div className='totalPrice'>
                <span>Total</span>
                <span>
                    {
                        total
                    }

                </span>

            </div>
            <div className='checkoutBtn' onClick={hideCart}>
                <Link className='checkoutLink' to='/checkout'>checkout</Link>


            </div>
            <div>

                {

                    displayCart.map(product => product.quantity)

                }
            </div>


        </div>
    );
};

export default AddToCart;