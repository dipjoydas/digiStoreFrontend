import React from 'react';
import { Link } from 'react-router-dom';
import { useCompareContext } from '../../context/Compare_context';
import './compareProduct.css'
const CompareProduct = () => {
    const { compareProducts ,removeFromCompare} = useCompareContext()
   
    let combinedSpecificationarray
    const compareArray = []

    compareProducts.map(product => {
        const modifiedSpecification = []


        product.specification?.map(obj => {
            const modifiedObj = {}
            const modifiedArray = []
            const key = Object.keys(obj)[0]
            const array = obj[key]
            array.map((inneritem, index) => {

                const inneritemString = inneritem.toString()
                const splitarray = inneritemString.split('*')

                modifiedArray.push(splitarray)
            })
            modifiedObj[key] = modifiedArray
            modifiedSpecification.push(modifiedObj)


        })
        compareArray.push(modifiedSpecification)



    })
  
    // ----------------------------------------------------------------------------------------------------------------------------
    compareArray.map((array, index) => {
        if (index == 0) {
            combinedSpecificationarray = array

        } else {
            array.map((obj) => {
                const key = Object.keys(obj)[0]
                const subarray = obj[key]
                let isMatchKey = []
               
                //---------------------------------- firs check is this key exists in combinedSpecificationarray-------------------------------- 

                combinedSpecificationarray.map((objCS, indexCom) => {
                    const CSkey = Object.keys(objCS)[0]

                    if (CSkey == key) {
                        // find ------------------------------------key-------------------------------------------------
                        const subarrayCS = objCS[CSkey]
                        subarray.map((innerArray, indexinnerArrayCS) => {

                            const isInnerArrayKeyMatch = []
                            subarrayCS.map(innerArrayCS => {

                                if (innerArrayCS[0] == innerArray[0]) {
                                    
                                    if (innerArrayCS.length != (index + 1)) {
                                        const substraction = (index + 1) - innerArrayCS.length

                                        const emptyArray = new Array(substraction)
                                        const addedArray = [...emptyArray, innerArray[1]]
                                        innerArrayCS.push(...addedArray)

                                    } else {
                                        innerArrayCS[index + 1] = innerArray[1]

                                    }

                                  


                                } else {
                                    // ------------------------------------------if not found --------------------------------------------
                                    isInnerArrayKeyMatch.push(1)
                                    if (isInnerArrayKeyMatch.length == subarrayCS.length) {

                                        const emptyArray = new Array(index)
                                        innerArray.splice(1, 0, ...emptyArray)
                                        subarrayCS.push(innerArray)

                                    }

                                }

                            })


                        })
                        // make a logic that if find any or mathch any key with CSkey, add an variable that indicate that key is found  in whole array and upadate that variables value  from here 




                    } else {
                       
                        // if key not match ----------then make a counter that count  how many times not found occurs if the not found amounts equal to the length of  combinedspecificationarray that means key value not exits at all in combinedspecificationarray then make a logic for 
                        isMatchKey.push(1)
                      
                        if (isMatchKey.length == combinedSpecificationarray.length) {
                          
                            // some modification of not found object just to make hole 
                            subarray.map((innerarray) => {
                             

                                // add specific number of hole based on index 
                                const emptyArray = new Array(index)
                                innerarray.splice(1, 0, ...emptyArray)



                            })
                            combinedSpecificationarray.push(obj)


                        }



                    }
                })
    


            })

        }



    })

    //  now add empty array item for those whose length is less than other to make innerarray length equal and to add  empty td just for ui desigin 
    combinedSpecificationarray?.map(obj=>{
        obj[Object.keys(obj)[0]].map(innerArray=>{
            const difference = (compareArray.length +1) - innerArray.length
            if(difference!= 0){
          
                const emptyArray = new Array(difference)
                innerArray.push(...emptyArray)
    
    
    
            }

        })

       
    })
  
  
    return (
        <div>
            <div className='CPTableContainer'>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {compareProducts?.map((product, index) =>
                                <td key={index}>
                                    <img src={"https://digi-storebackend.vercel.app/getimage/" + product.img} alt="" /> <br></br>
                                    <Link to={`/productdetails/${product._id}`}>{product.title}</Link>


                                    <h3>{product.price}</h3>
                                    <p className='delete' onClick={()=>removeFromCompare(product._id)}>Delete</p>
                                </td>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Summary </td>
                            {compareProducts?.map((product, inx) => <>
                                <td key={inx}>
                                    <ul>
                                        {
                                            product?.keyFeatures?.map(i => <li>
                                                {i.split('*')[0]}:
                                                {i.split('*')[1]}

                                            </li>)

                                        }

                                    </ul>
                                </td>
                            </>)}
                        </tr>

                    </tbody>

                    {/* specifiaction part --------------------------- */}
                    {
                        combinedSpecificationarray?.map(obj => <>
                            <thead>
                                <tr>
                                    <th colSpan={compareArray.length + 1} style={{textAlign:"center"}}>{Object.keys(obj)[0]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    obj[Object.keys(obj)[0]].map(innerArray =>

                                        <tr>

                                            {
                                                innerArray?.map((item,index)=><>
                                                <td>{item}</td>
                                               
                                                </>)


                                            }


                                        </tr>
                                    )
                                }

                            </tbody>
                        



                        </>)
                    }

                </table>

            </div>

        </div>
    );
};

export default CompareProduct;