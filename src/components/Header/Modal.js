import React, { useEffect } from 'react';

const Modal = () => {
   useEffect(()=>{

    const btn = document.getElementsByClassName('hambergerContainer')[0]
    const modal = document.getElementsByClassName('modal')[0]
    function trigarNavbar(){
        if (modal.style.display === "block") {
            modal.style.display = "none";
          } else {
            modal.style.display = "block";
          }
    }
    function closeByTarget(event){
        if (event.target == modal) {
            // modal.style.display = "none";
            btn.click()
          }

    }
    btn?.addEventListener('click',trigarNavbar)
    modal.addEventListener('click',closeByTarget)
    return ()=>{
        btn?.removeEventListener('click',trigarNavbar)
        modal.removeEventListener('click',closeByTarget)
        
}
   },[])
    
};

export default Modal;