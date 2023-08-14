import React, { useEffect } from 'react';

const HambergerStyle = () => {

    useEffect(()=>{
        const hambergerContainer = document.getElementsByClassName('hambergerContainer')[0]
                const links = document.getElementsByClassName('links')[0]
                
                const hambergerFunaction = ()=>{
                                    
                       
                                    hambergerContainer.classList.toggle('open')
                                    links.classList.toggle('active')
                    }
    
    
                    hambergerContainer.addEventListener('click',hambergerFunaction)
     return ()=>{ hambergerContainer.removeEventListener('click',hambergerFunaction)}
       },[])

   
};

export default HambergerStyle;