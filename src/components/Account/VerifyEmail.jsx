import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/Auth_context';
import { useNavigate } from 'react-router-dom';
import './verifyEmail.css'

const VerifyEmail = () => {
    const { verifyEmail } = useAuthContext()
    const navigate = useNavigate()
    const otp = useRef()
    const [timer ,settimer]=useState(120)

    useEffect(()=>{
        document.getElementById('resendOptBtn').style.background = 'gray'
        const interval = setInterval(()=>{
            if(timer){
                settimer(timer-1)
            }else {
                clearInterval(interval)
            }
        },1000) 
        return ()=>clearInterval(interval)
        

    },[timer])
   const handleResendOptButton =()=>{
    setTimeout(()=>{
        document.getElementById('resendOptBtn').disabled =false
        document.getElementById('resendOptBtn').style.background = 'orange'

    },2000*120)
   }
   handleResendOptButton()
    const handleResendOtp =async()=>{
        document.getElementById('resendOptBtn').disabled =true 
        document.getElementById('resendOptBtn').style.background = 'gray'
        handleResendOptButton()
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
            // console.log(result)

        }catch(error){
            // console.log(error)

        }

    }
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
                <h3>Do not get? resend after {timer} seconds</h3>
                <input onClick={handleResendOtp} type="submit" value="Resend Opt" id='resendOptBtn' disabled />
                {/* <button onClick={handleResendOtp}>Resend Otp</button> */}
            </div>

        </div>
    );
};

export default VerifyEmail;