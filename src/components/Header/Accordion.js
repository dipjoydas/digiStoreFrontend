import React, { useEffect } from 'react';

const Accordion = () => {
    useEffect(()=>{

const accs = document.getElementsByClassName("accordion");

function accordion(){
    this.classList.toggle('active')
    const panel = this.nextElementSibling
    if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    
}

for(const acc of accs ){
    acc.addEventListener('click',accordion)
}
return function(){
    for(const acc of accs ){
        acc.removeEventListener('click',accordion)
    }
    
}


       
    },[])
};

export default Accordion;