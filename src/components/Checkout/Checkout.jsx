import React, { useRef, useState } from 'react';
import { useCartContext } from '../../context/Cart_context';
import { useAuthContext } from '../../context/Auth_context';
import { useNavigate } from 'react-router-dom';
import './checkout.css'


const Checkout = () => {
    const [delivaryCharge, setDelivaryCharge] = useState(100)
    // const [subTotal ,setSubTotal] = useState(SubTotal())
    const navigate = useNavigate()
    const [total, setTotal] = useState()
    const [net, setNet] = useState()
    const firstNameValue = useRef()
    const lastNameValue = useRef()
    const numberValue = useRef()
    const emailValue = useRef()
    const addressValue = useRef()
    const cityValue = useRef()
    const commentsValue = useRef()
    // let delivaryCharge = document.querySelector('input[name="delivary"]:checked')?.value;
    const handleDelivaryCharge = (e) => {
        let charge = e.target.value
        setDelivaryCharge(charge)
        const total = +subTotal + +charge
        setTotal(total)
        setNet(total)



    }

    const handleVoucher = () => {
        let deduct = 100
        let net = total - deduct
        setNet(net)

    }
    const { displayCart } = useCartContext()
    const { user } = useAuthContext()
   
    const SubTotal = () => {
        let total = 0
        displayCart.map(product => {
            total = +total + +(product.price * product.quantity)
            //
        })

        // 
        return total
    }
    const [subTotal, setSubTotal] = useState(SubTotal())



    // ---------------------------------------------------------- handle confirm order ------------------------------------------------------
    //  
    const handleConfirmOrder = async (e) => {
        e.preventDefault()

        const order = {
            expiresAt: new Date(Date.now() + (60 * 10 * 1000)),
            // delete after 10 minutes 
            name: firstNameValue.current.value + ' ' + lastNameValue.current.value,
            number: numberValue.current.value,
            email: emailValue.current.value,
            address: addressValue.current.value,
            city: cityValue.current.value,
            comment: commentsValue.current.value,
            price: net,
            delivary: delivaryCharge,
            orders: displayCart

        }
        try {
            const Authentication = JSON.parse(localStorage.getItem("token"))
            const res = await fetch('https://digi-storebackend.vercel.app/addtemporaryorder', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "Authentication": Authentication


                },
                body: JSON.stringify(order)
            })
            const result = await res.json()


            //---------------------------------- now navigate to payment page --------------------------------------------------------
            const from = `/payment/${result.id}`
            navigate(from, { replace: true })

        } catch (error) {
            console.log(error, 'error form confirm order')

        }



    }
    return (
        <div className='checkoutContainer'>

            <div className='userInfo'>
                <h1>Customer Information </h1>
                <form action="" id='userInfo' onSubmit={handleConfirmOrder}>

                    <input ref={firstNameValue} type="text" name='firstname' placeholder='first name' /><br />
                    <input ref={lastNameValue} type="text" name='lastname' placeholder='last name' /><br />
                    <input ref={numberValue} type="text" name='number' placeholder='contact number' /><br />
                    <input ref={emailValue} type="email" name="" id="" placeholder='email' value={user.email} disabled /><br />
                    <input ref={addressValue} type="text" name="address" id="" placeholder='address' /><br />
                    <input ref={cityValue} type="text" name="city" id="" placeholder='city' /><br />
                    <textarea ref={commentsValue} name="" id="" cols="30" rows="10" placeholder='commments'></textarea>

                </form>



            </div>
            <div className='delivery&voucherContainer'>
                <div className='delivaryInfo'>
                    <h1>Delivary Method</h1>
                    <label htmlFor="standardDelivary">Standard delivary 100 taka</label>
                    <input type="radio" name="delivary" id="standardDelivary" required value={100} onClick={handleDelivaryCharge} />
                    <label htmlFor="expressDelivary">Express delivary 200 taka</label >
                    <input type="radio" name="delivary" id="expressDelivary" required value={200} onClick={handleDelivaryCharge} />


                </div>
                <div className='voucherContainer'>
                    <input type="text" name="" id="" />
                    <input type="button" value="apply voucher" onClick={handleVoucher} />

                </div>
            </div>

            <div className='orderOverview'>
                <h1>Order Overview</h1>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>price</th>
                        <th>Total</th>
                    </tr>
                    {
                        displayCart?.map(product => <>
                            <tr>
                                <td>{product.title}</td>
                                <td>{product.price}x{product.quantity}</td>
                                <td>{product.price * product.quantity}</td>
                            </tr>

                        </>)
                    }
                    <tr>

                        <td > Sub Total </td>
                        <td></td>
                        <td >{subTotal}</td>
                    </tr>
                    <tr>
                        <td>Delivary charge</td>
                        <td></td>
                        <td>{delivaryCharge}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>voucher</td>
                        <td></td>
                        <td>{ }</td>
                    </tr>
                    <tr>
                        <td>net</td>
                        <td></td>
                        <td>{net}</td>
                    </tr>



                </table>


            </div>
            <input type="submit" value="confirmOrder" form='userInfo' />


        </div>
    );
};

export default Checkout;