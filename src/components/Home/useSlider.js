import React, { useEffect } from 'react';
let intervalId

const useSlider = (images) => {
  useEffect(() => {
    const slides = document.getElementsByClassName('slider')
    var slideIndex = 0;
   

    function carousel() {



      for (const slide of slides) {
        slide.style ? slide.style.display = 'none' : ''
      }

      if (slideIndex == slides.length) { slideIndex = 0 }
      slides[slideIndex] ? slides[slideIndex].style.display = 'block' : ''
      slideIndex++;

    }
    const startCarousel = () => {
      intervalId = setInterval(carousel, 5000);
    }
    startCarousel()
    const stopCarousel = () => {
      // window.alert('hit')
      clearInterval(intervalId);
      intervalId = null;
    }

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && intervalId === null) {
      
          startCarousel();
      } else if (document.visibilityState === "hidden" && intervalId !== null) {
          stopCarousel();
      }
  });
  return ()=>clearInterval(intervalId)

  }, [images])
};

export default useSlider;   