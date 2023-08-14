import React, { useRef } from 'react';
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SIgnUp = () => {
    const navigate = useNavigate()
    const {signUp} =useAuth()
    const nameValue = useRef()
    const emailValue = useRef()
    const passValue = useRef()
    const reTypePassValue = useRef()
    const phoneValue = useRef()
    const handleSingUp =async(e)=>{
        e.preventDefault()
        const name = nameValue.current.value
        const email = emailValue.current.value
        const password = passValue.current.value
        const reTypePass = reTypePassValue.current.value
        const phone = phoneValue.current.value
        const user = {
            name,
            email,
            password,
            phone,
        }
      const result =  signUp(user)
      if(result){
        navigate('/verifyemail')

      }
      
    }
    return (
        <div className='signUpContainer'>
            <div className='signUp'>
            <h1>Please Sign Up</h1>
                <form action=""onSubmit={handleSingUp}>
                    <label htmlFor="name">Name</label>
                    <input ref={nameValue} type="text" name="" id="name" placeholder='name' />
                    <label htmlFor="email">Email</label>
                    <input ref={emailValue} type="text" name="" id="email" placeholder='email' />
                    <label htmlFor="phone">Phone Number</label>
                    <input ref={phoneValue} type="text" id='phone' placeholder='phone number' />
                    <label htmlFor="password">Password</label>
                    <input ref={passValue} type="password" name="" id="" placeholder='password' />
                    {/* <label htmlFor="reTypePss">Retype Password</label>
                    <input ref={reTypePassValue} type="password" name="" id="" placeholder='Retype password' /> */}
                    <input type="submit" value="signUp" />
                    

                </form>
                <h1>Already have an account?</h1>
                <div><Link to='/login'>Log in</Link></div>
                

            </div>

        </div>
    );
};

export default SIgnUp;