import React, { useRef, useState } from 'react';
import './forgetpassword.css'

const ForgetPassword = () => {
    const [emailRes, setEmailRes] = useState('')
    const [resetMsg, setResetMsg] = useState('')
    const otp = useRef()
    const nP = useRef()
    const rNP = useRef()
    const email = useRef()
    const handleEmail = async (e) => {
        e.preventDefault()
        const emailValue = email.current.value
        try {
            const res = await fetch('http://localhost:5000/getresetcode', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ emailValue })
            })
            const result = await res.json()
            setEmailRes(result.result)



        } catch (error) {

        }


    }
    const handleResetPassword = async (e) => {
        const newPass = nP.current.value
        const emailValue = email.current.value
        const otpValue = otp.current.value


        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5000/resetpassword', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ emailValue, newPass, otpValue })
            })
            const result = await res.json()
            setResetMsg(result.result)


        } catch (error) {
            console.log(error)

        }


    }
    return (
        <div className='forgetpassContainer'>
            <div className='forgetpss'>
                <h1> ForgetPassword</h1>
                <form action="" onSubmit={handleEmail}>
                    <input ref={email} type="email" name="" id="" placeholder='email' required />
                    <input type="submit" value="get reset code " />
                    {emailRes}
                </form>
                <form action="" onSubmit={handleResetPassword}>
                    <input ref={otp} type="text" name="" id="" placeholder='otp' required />
                    <input ref={nP} type="password" name="" id="" placeholder='new password' required />
                    {/* <input ref={rNP} type="password" name="" id="" placeholder='re type password' /> */}
                    <input type="submit" value="reset password" />
                    {resetMsg}

                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;