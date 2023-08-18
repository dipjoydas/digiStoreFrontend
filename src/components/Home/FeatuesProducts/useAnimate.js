

const useAnimate = () => {
    const elements = document.querySelectorAll('.featureProductContainer')
    console.log(elements,'ement form useanimate')
    window.onscroll =()=>{
        elements.forEach(element=>{
            let WindowHeight = window.innerHeight
            let positon = element.getBoundingClientRect().top 
            // console.log(height,"height",positon,'postition')
            // let top = window.scrollY 
            // let offset = element.offsetTop - 150 
            // let elementHeight = element.offsetHeight 
            if(WindowHeight >=positon + 100 ){
                // if(top>=offset && top < offset + height){
                element.classList.add('showAnimate')
            }else {
                element.classList.remove('showAnimate')
            }
        })
    }
  
};

export default useAnimate;

// && top <offset + height