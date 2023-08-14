import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import './payment.css'

const stripePromise = loadStripe('pk_test_51NTI9OA1Y0nx3FySg7QsDmBQ6sK2Njdn84NR2QdAeynZoB2E1EafPZzUhjKAdUIFdy95vFzLyktQXHWxAEjsudCn007ck0LSTq')

const Payment = () => {
    const { id } = useParams()
    const [appoinment, setAppoinment] = useState()
    const Authentication = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        (async () => {
            const res = await fetch(`https://digi-storebackend.vercel.app/gettempoorder/${id}`, {
                headers: {
                    "Authentication": Authentication
                }
            })
            const result = await res.json()
            setAppoinment(result)



        })()
    }, [])
    return (
        <div className='paymentContainer'>
            <div className='payment'>
                <h1>Please pay for {id}</h1>
                <p>pay within 10 minutes otherwise order will be deleted</p>
                {
                    appoinment?.price && <Elements stripe={stripePromise} >
                        <CheckoutForm appoinment={appoinment}></CheckoutForm>
                    </Elements>
                }
            </div>


        </div>
    );
};

export default Payment;