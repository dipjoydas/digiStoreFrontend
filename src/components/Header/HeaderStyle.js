import React, { useEffect } from 'react';

const HeaderStyle = () => {
   useEffect(()=>{

    const makeup =(elements)=>{
        let length =Math.floor( elements.length/2 )
        for(const dropdown of elements ){
            if(length>0){
                const dropdownContent2=  dropdown.getElementsByClassName('dropdownContent2')
                for(const dropdown2 of dropdownContent2){
              
                  dropdown2.style.left='100%'
             
                }
                length--
                continue;
                
    
            }else{
          
                dropdown.style.left=null
                dropdown.style.right='0%'
              const dropdownContent2=  dropdown.getElementsByClassName('dropdownContent2')
              for(const dropdown2 of dropdownContent2){
             
                
                dropdown2.style.right='100%'

              
              }
            
            
            }
    
        }
        
    }
    const dropdowns = document.getElementsByClassName('dropdownContent')
    makeup(dropdowns)
  //  flex wrap detect ----------------------------------------------------------
  const flexitems = document.querySelectorAll('.header2 .dropdown')
  let iswrap = false;
  let prevItem ={}
  let currItem ={}
  const header1 = document.getElementsByClassName('header1')[0]
  const header2 = document.getElementsByClassName('header2')[0]
  const resHeader1 = document.getElementsByClassName('resHeader1')[0]
  const resHeader2= document.getElementsByClassName('resHeader2')[0]
  const flexDetect = ()=>{

    for(let i =0 ;i<flexitems.length;i++){
      if(i===0){
        prevItem = flexitems[i].getBoundingClientRect()

      }else{
        currItem = flexitems[i].getBoundingClientRect()


        if( prevItem.top < currItem.top) {
          iswrap = true
          
         
          break 
        }else {
         iswrap = false
        
     
        }
        prevItem = currItem

      }
    }

  
 

  }



  


























  // ////////////////////////////////////////////////////////////////////////////////////////////////////

   
   },[])
};

export default HeaderStyle;