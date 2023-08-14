import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    
    // window.alert('hit on load')
    // it get users onreload and set to user state 
    // let loading = false
    useEffect(() => {
       
        // 
       

            const Authentication = JSON.parse(localStorage.getItem("token"))
            if (Boolean(Authentication)) {

                // setLoading(true)
               


                    const getUser = async () => {
                        // const Authentication = JSON.parse(localStorage.getItem("token"))
                        const res = await fetch("http://localhost:5000/getuser", {
                            method: "GET",
                            headers: {
                                "Authentication": Authentication
                            }
                        })
                        const result = await res.json()
                        console.log(result, 'page refresh')
                        setUser(result)
                        console.log(user, 'form first load of page ')
    
                        // loading = false
                        setLoading(false)
    
    
                    }
                    getUser()
                // loading = true
                



            }



       





    }, [])



    const signUp = async (user) => {
        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
            )
            const result = await res.json()
            if(result.result === "success"){
                localStorage.setItem("email",JSON.stringify(user.email))
                return true

            }
            
           
            // setUser(result.user)
            
            // const token = `Bearer ${result.token}`
            // const stringifiedToken = JSON.stringify(token)

            // localStorage.setItem("token", stringifiedToken)


        } catch (error) {

        }


    }
    const verifyEmail = async(otpValue)=>{
        try{
            const email = JSON.parse(localStorage.getItem("email"))
         
            
            const res = await fetch('http://localhost:5000/verifyemail',{
                method:"POST",
                headers:{
                    "content-Type": "application/json",
                },
                body:JSON.stringify({email,otpValue})
            })
            const result =await res.json()
            console.log(result,'result from useauth')
            setUser(result.user)
            
            const token = `Bearer ${result.token}`
            const stringifiedToken = JSON.stringify(token)

            localStorage.setItem("token", stringifiedToken)

         }catch(error){

         }




        

    }
    // ---------------------------------------log in -----------------------------------------------------------------------------
    const logIn = async (email, password) => {


        try {
            const userInfo = { email, password }
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            }
            )
            const result = await res.json()
            // console.log(result,'result from useauth')
            setUser(result.user)
            // console.log(result,'result')
            // console.log(user, 'from sign up')
            const token = `Bearer ${result.token}`
            const stringifiedToken = JSON.stringify(token)

            localStorage.setItem("token", stringifiedToken)
            navigate(from, { replace: true })
           


        } catch (error) {
            console.log(error)

        }




    }
    // ---------------------------------------log out ------------------------------------------------------------------------------
    const logOut = async () => {
        const Authentication = JSON.parse(localStorage.getItem("token"))
        const res = await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: {
                "Authentication": Authentication
            }
        })
        const result = await res.json()
        // now romove token form localStorage -----------------------------------------
        localStorage.removeItem("token")
        setUser('')

    }
    return {
        signUp,
        logIn,
        logOut,
        user,
        setUser,
        loading,
        setLoading,
        verifyEmail

    }
};

export default useAuth;