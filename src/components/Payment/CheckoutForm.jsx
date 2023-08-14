import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import './checkoutform.css'


const CheckoutForm = ({ appoinment }) => {
    const { price, _id } = appoinment; 
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://digi-storebackend.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
      
    }, [price]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                transId: _id
            },

        });

        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
         
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,


                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully.')
           
            setProcessing(false);
            // save to database

            (async () => {
                const Authentication = JSON.parse(localStorage.getItem("token"))
                const transaction = paymentIntent.client_secret.split('_secret_')[1]
                const order = appoinment
                order.transaction = transaction
              
                const res = await fetch(`https://digi-storebackend.vercel.app/updateorder/${_id}`, {
                    method: "PUT",
                    headers: {
                        "content-Type": "application/json",
                        "Authentication": Authentication


                    },
                    body: JSON.stringify(order)
                })
                const result = await res.json()
            

            })()

        }

    }
    return (
        <div className='checkoutform'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? 'loading' : <button type="submit" disabled={!stripe || success}>
                    Pay {price}
                </button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;