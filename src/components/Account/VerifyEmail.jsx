import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/Auth_context';
import { useNavigate } from 'react-router-dom';
import './verifyEmail.css'

const VerifyEmail = () => {
    const { verifyEmail } = useAuthContext()
    const navigate = useNavigate()
    const otp = useRef()
    const handleResendOtp =async()=>{
        try{
            const email = JSON.parse(localStorage.getItem("email"))
         
            
            const res = await fetch('https://digi-storebackend.vercel.app/resendopt',{
                method:"POST",
                headers:{
                    "content-Type": "application/json",
                    mode: 'no-cors'
                },
                body:JSON.stringify({email})
            })
            const result =await res.json()
            console.log(result)

        }catch(error){
            console.log(error)

        }

    }

    // useEffect(() => {
    //     const timer = () => {
    //         let timeRemaining = 90
    //         timeRemaining = timeRemaining - 1
    //         setCounter(timeRemaining)
    //         if (timeRemaining == 0) {
    //             return
    //         }
        

    //         setTimeout(timer, 1000)
    //     }
    //     timer()


    // })
    const handleVerify = async (e) => {
        e.preventDefault()
        const otpValue = otp.current.value
        verifyEmail(otpValue)
        if (Boolean(localStorage.getItem("token"))) {
            navigate('/', { replace: true });
        }



    }
    return (
        <div className='verifyEmailContainer'>
            <div className='verifyEmail'>
                <h1>Please verify your email </h1>
                <form action="" onSubmit={handleVerify}>
                    <input ref={otp} type="text" name="" id="" placeholder='opt' />
                    <input type="submit" value="submit" />
                </form>
                <h3>Do not get ?</h3>
                <input onClick={handleResendOtp} type="submit" value="Resend Opt" />
                {/* <button onClick={handleResendOtp}>Resend Otp</button> */}
            </div>

        </div>
    );
};

export default VerifyEmail;