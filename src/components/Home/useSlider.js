import React, { useEffect } from 'react';

const useSlider = (images) => {
    useEffect(()=>{
        const slides = document.getElementsByClassName('slider')
         var slideIndex = 0;
         carousel();

function carousel() {
  
  
  
  for  (const slide of slides){
    slide.style?slide.style.display ='none':''
  }
  
  if (slideIndex == slides.length) {slideIndex = 0}
  slides[slideIndex]?slides[slideIndex].style.display ='block':''
   slideIndex++;
   
 const timeout = setTimeout(carousel, 2000); 
 
 
 return ()=>{ 
    clearTimeout(timeout)

  }

  }
  
      
    },[images])
};

export default useSlider;   