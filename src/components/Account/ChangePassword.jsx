import React, { useRef, useState } from 'react';
import './changePass.css'

const ChangePassword = () => {
    const cP = useRef()
    const nP = useRef()
    const [response, setResponse] = useState('')
    const handleChangePassword = async (e) => {
        e.preventDefault()
        const currentPassword = cP.current.value
        const newPassword = nP.current.value
        try {
            const Authentication = JSON.parse(localStorage.getItem("token"))
            const res = await fetch('http://localhost:5000/changepassword', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "Authentication": Authentication
                },
                body: JSON.stringify({ currentPassword, newPassword })
            })
            const result = await res.json()
           
            setResponse(result.result)




        } catch (error) {
            console.log(error)

        }

    }
    return (
        <div className='changePasswordContainer'>
            <form action="" onSubmit={handleChangePassword}>
                <input ref={cP} type="text" placeholder='current password' />
                <input ref={nP} type="text" placeholder='new password' />
                <input type="submit" value="change password" />
                <span>{response}</span>
            </form>

        </div>
    );
};

export default ChangePassword;