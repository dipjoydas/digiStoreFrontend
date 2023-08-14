import { useEffect, useState } from "react";


const useCompare = () => {
    // const compareProducts =[]
    const [compareProducts,setCompareProducts]=useState([])
    const [toastContent , setToastContent] =useState('')

    const addToCompare = async(id)=>{
        
            try {
                const res = await fetch("https://digi-storebackend.vercel.app/product/" + id)
                const result = await res.json()
                setCompareProducts([...compareProducts,result])
                    setToastContent("Added to compare")
                    setTimeout(()=>{
                        setToastContent('')
                    },4000)
                    
                
               


            } catch (error) {
                console.log(error)

            }


    }

    // remove products from compare ///////////-----------------------------------------------------------------------------------\
    const removeFromCompare =(id)=>{
       
        const updatedCompareProductsValue =[]
        compareProducts?.map(product=>{
            if(product._id == id){

            }else {
                updatedCompareProductsValue.push(product)
                
            }
            setCompareProducts([...updatedCompareProductsValue])
        })


    }
    useEffect(()=>{

    },[compareProducts])
    return {
        addToCompare ,
        compareProducts,
        removeFromCompare,
        toastContent ,
        setToastContent
        
    }
};

export default useCompare;