import React, { useState } from 'react';
import { useCompareContext } from '../context/Compare_context';


const useLocalStorage = () => {
    const [displayCart, setDisplayCart] = useState([])
    const { setToastContent } = useCompareContext()


    const handleAddToCart = (id, title, price, img, quantity) => {
        // first check if cart exists or not 
        let cartValue = {}
        const inputValue = quantity

        const isFound = Boolean(localStorage.getItem("cart"))
        if (isFound) {
            // let cartValue = {}
            const cart = localStorage.getItem("cart")
            cartValue = JSON.parse(cart)
            // console.log(cartValue,'cartvalue')
            const isMatch = id in cartValue
            //    console.log(isMatch,'ismathch')
            if (isMatch) {
                cartValue[id] = + cartValue[id] + + inputValue
                //    console.log(cartValue,"updatecartvalue")
                localStorage.setItem("cart", JSON.stringify(cartValue))

            } else {
                cartValue[id] = +inputValue
                localStorage.setItem("cart", JSON.stringify(cartValue))
            }

        }
        else {
            // console.log('works ')
            cartValue[id] = inputValue
            localStorage.setItem("cart", JSON.stringify(cartValue))

        }

        // now add to toast 
        setToastContent("Added to Cart")
        setTimeout(() => {
            setToastContent('')
        }, 3000)


        // console.log(cartValue, 'cartValue')
        // now set to cart 
        // localStorage.setItem("cart",JSON.stringify(cartValue))
        // -----------------------------now add product to displayCart to show live output------------------------------------------------

        // first check product already in cart ----------------
        const cart = displayCart
        if (cart.length == 0) {
            const product = {
                id,
                title,
                quantity: inputValue,
                price,
                img
            }
            setDisplayCart([product])
        } else {
            const isFound = cart.some((product, index) => {
                if (id == product.id) {
                    product.quantity = + product.quantity + +inputValue
                    cart[index] = product
                    setDisplayCart([...cart])
                    return product;
                }


            })
            if (!isFound) {
                // window.alert('in else of ')

                const product = {
                    id,
                    title,
                    quantity: inputValue,
                    price,
                    img
                }
                setDisplayCart([...displayCart, product])

            }
            // cart.map((product,index)=>{
            //     if(id == product.id){
            //         window.alert('working in operator')
            //         product.quantity = + product.quantity + +inputValue
            //         cart[index] = product
            //         setDisplayCart([...cart])
            //     }else{
            //         window.alert('in else of ')

            //         const product = {
            //             id,
            //             title,
            //             quantity:inputValue,
            //             price,
            //             img
            //         }
            //         setDisplayCart([...displayCart,product])
            //     }

            // })

        }





    }


    // remove form cart to cart 
    const handleRemoveFromCart =(id)=>{
        
        const cart = localStorage.getItem("cart")
        const cartValue = JSON.parse(cart)
        delete cartValue[id]

        localStorage.setItem("cart", JSON.stringify(cartValue))
        const displayCartValue = displayCart
        displayCartValue.map((item,index)=>{
            if(item.id == id){
                displayCartValue.splice(index,1)
                // window.alert('insided',index)
                console.log(displayCartValue,'display cart value')

                

            }
            
        })
        setDisplayCart([...displayCartValue])

    }


    return {
        handleAddToCart,
        displayCart,
        setDisplayCart,
        handleRemoveFromCart
    };
};

export default useLocalStorage;