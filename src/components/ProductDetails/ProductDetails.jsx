import React, { useEffect, useRef, useState } from 'react';
import { Link, json, useParams } from 'react-router-dom';
import './productDetails.css'
import { useCartContext } from '../../context/Cart_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../context/Auth_context';

const ProductDetails = () => {
    const { handleAddToCart } = useCartContext()
    const { user } = useAuthContext()
    const input = useRef("1")
    const { id } = useParams()


    const [productDetails, setProductDetails] = useState({})
    const [displayReview, setDisplayReview] = useState()
    const [rVPState, setRVPState] = useState([])
    useEffect(() => {
        const productFetch = async () => {
            try {
                const res = await fetch("https://digi-storebackend.vercel.app/product/" + id)
                const result = await res.json()
                setProductDetails(result)



            } catch (error) {
                console.log(error)

            }


        }
        productFetch()

    }, [id])
    // set initial value of input field 
    useEffect(() => {
        document.getElementById('quantity').value = 1

    }, [productDetails])

    const changeQuantity = (indicator) => {
        const inputValue = input.current.value
        if (indicator == '+') {
            input.current.value = + inputValue + 1
        }
        if (indicator == '-') {
            if (inputValue == '1') { return }
            input.current.value = + inputValue - 1
        }

    }



    const { _id, category, title, price, oldPrice, regularPrice, keyFeatures, specification, description, reviews, img } = productDetails
  

  
    
    const handleWriteReview = async (e) => {
        e.preventDefault()

        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const des = document.getElementById('reviewDes').value

        const review = {
            rating,
            des
        }
        // now update product with reviews 
        const Authentication = JSON.parse(localStorage.getItem("token"))

        try {
            const res = await fetch(`https://digi-storebackend.vercel.app/addreview/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    "Authentication": Authentication
                },
                body: JSON.stringify(review)
            })
            const result = await res.json()
          


        } catch (error) {
            console.log(error)

        }


    }
    //--------------------------------------------- style rating icon ------------------------------------------------
    const [avgRating, setAvgRating] = useState()
    useEffect(() => {
        setDisplayReview(reviews)

    }, [productDetails])
    useEffect(() => {
        if (Boolean(displayReview)) {
            const reviewLength = displayReview?.length
            let ratingSum = 0

            displayReview?.map(review => {
                ratingSum = ratingSum + +review.rating
            })
     
            let avgRating = Math.ceil((ratingSum / reviewLength))
            setAvgRating(avgRating)


            const reviewsContainer = document.getElementsByClassName('reviews')[0]
            const avgRatingContainer = reviewsContainer?.childNodes[2]
   
            let z = 1
            for (let icon of avgRatingContainer.childNodes) {


                icon.style.color = "red"
                if (z == avgRating) {

                    break

                }
                
                z++

            }

        }



        // ---------------------------------------------------------------------------------
        const reviews = document.getElementsByClassName('review')
        let index = 0
        for (let review of reviews) {
            const rating = displayReview[index].rating
            index++
            const ratingContainer = review.childNodes[0]

            let i = 1
            for (let icon of ratingContainer.childNodes) {
                icon.style.color = "red"

                if (i == rating) {
                    break
                }
                i++
            }

        }

    }, [displayReview])
    // add product to localStorage to view recently viewed product 
    useEffect(() => {
        if (Boolean(_id)) {

            const add = () => {
                let rVPValue = []
                const expiresAt = Date.now() + 18000000
                const recentlyViewedProduct = { id: _id, expiresAt: expiresAt }
                const isFound = Boolean(localStorage.getItem("rVP"))
                if (isFound) {
                    const rVP = localStorage.getItem("rVP")
                    rVPValue = JSON.parse(rVP)
                    const isIdFound = rVPValue.some((rvp) => {
                        return rvp.id == _id
                    })

                    if (isIdFound) {
                        return
                    }
                    rVPValue.push(recentlyViewedProduct)
                    localStorage.setItem("rVP", JSON.stringify(rVPValue))
                } else {
                    rVPValue.push(recentlyViewedProduct)
                    localStorage.setItem("rVP", JSON.stringify(rVPValue))

                }


            }
            // remove expired product from rVp 
            const remove = () => {
                let rVP = localStorage.getItem("rVP")
                const isFound = Boolean(rVP)
                if (!isFound) {
                    return
                }
                let rVPValue = JSON.parse(rVP)
                const filterRVP = rVPValue.filter(rvp => {
                    return Date.now() <= rvp.expiresAt

                })
                localStorage.setItem("rVP", JSON.stringify(filterRVP))


            }
            remove()

            // now add to ui 
            const addToUi = async() => {
                const rVP = localStorage.getItem("rVP")
                const rVPValue = JSON.parse(rVP)
                let rVPToArray = []
                if (Boolean(rVPValue)) {
                    rVPValue.map(rvp => {
                        const rvpId = rvp.id
                        rVPToArray.push(rvpId)


                    })
                  
                    
                        const res = await fetch(`https://digi-storebackend.vercel.app/getrvp`,{
                            method:"POST",
                            headers:{
                                "content-Type": "application/json"
                            },
                            body:JSON.stringify(rVPToArray)

                        })
                        const result = await res.json();
                        setRVPState(result)
                }
            }
            addToUi()

            add()
        }
    }, [_id])
    useEffect(() => {


    }, [rVPState])


    //  scroll to specific point of page-----------------------------
    const scrollToView = (value) => {
        const element = document.getElementById(value)
        element.scrollIntoView({ behavior: 'smooth' })

    }








    return (
        <div style={{ background: "#F2F4F8" }}>
            <div className='PDTopBanner'>
                <div className='PDImgContainer'>
                    <img src={"https://digi-storebackend.vercel.app/getimage/" + img} alt="" />

                </div>
                <div className='PDTextContainer'>
                    <h1 className='PDHeading'>{title}</h1>
                    <div className='PDPriceContainer'>
                        <span>Price :{price}$</span>
                        <span>Old Price : {oldPrice}</span>
                        <span>Regular Price :{regularPrice}</span>
                    </div>
                    <div>
                        <h3>Key Features</h3>
                        <ul>
                            {
                                keyFeatures?.map(i => <li>
                                    {i.split('*')[0]}:
                                    {i.split('*')[1]}

                                </li>)

                            }
                        </ul>
                    </div>
                    {/* buy now and part -------------------------------------------------- */}
                    <div className='buynow'>
                        <span onClick={() => changeQuantity("-")}>-</span>
                        <input type="text" name="" id="quantity" ref={input} />
                        <span onClick={() => changeQuantity("+")}>+</span>
                        <span onClick={() => handleAddToCart(_id, title, price, img, input.current.value)}>Add to Cart</span>


                    </div>
                </div>

            </div>
            {/*--------------------- Specification and recently viewed ----------------------------- */}
            <div className='specificationAndRecentlyViewedContainer'>
                <div className='specificationContainer'>
                    {/*  navigator of  specification ,*/}
                    <div className='navs'>
                        <ul className='nav'>
                            <li onClick={() => scrollToView('Specification')} >Specification</li>
                            <li onClick={() => scrollToView('Description')}>Description</li>
                            <li onClick={() => scrollToView('Reviews')}>Reviews</li>
                        </ul>
                    </div>
                    {/* specification part */}
                    <div className='specification' id='Specification'>
                        <div className='tableContainer'>
                            <table>
                                <caption>Specification</caption>
                                {/* <thead></thead>
                            <tbody></tbody> */}

                                {
                                    specification?.map(item => <>
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>{Object.keys(item)[0]}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item[Object.keys(item)[0]].map(item =>
                                                    <tr>
                                                        <td>{item.split('*')[0]}</td>
                                                        <td>{item.split('*')[1]}</td>
                                                    </tr>
                                                )
                                            }

                                        </tbody>



                                    </>)
                                }
                            </table>
                        </div>

                    </div>


                </div>
                {/* recent viewed products */}
                <div className='recentlyViewedProducts'>
                    <h3>Recently viewed Products</h3>
                    <div className='rVPContainer'>
                        {rVPState?.map((rvp, index) => <div key={index} className='itemContainer'>
                            <div className='imgContainer'>
                                <img src={`https://digi-storebackend.vercel.app/getimage/${rvp.img}`} alt="" />
                            </div>
                            <div className='textContainer'>
                                <Link to={`/productdetails/${rvp.id}`}>{rvp.title}</Link>
                                <h5>${rvp.price}</h5>
                            </div>
                        </div>)}


                    </div>


                </div>


            </div>
            {/*-------------------------------- description part -------------------------- */}
            <div className='description' id='Description'>
                <h1>Description</h1>
                <p>{description}</p>

            </div>
            <div className='reviews'>
                <h3 className='Rheading' id='Rheading'>Reviews {displayReview?.length}</h3>
                <p >Get specific details about this product from customers who own it.</p>

                <span className='reviewIconAverage'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </span> <span className='average'>{avgRating} out of 5</span>

                {reviews?.map(review => <>
                    <div className='review'>
                        <div className='reviewIcon'>
                            {<FontAwesomeIcon icon={faStar} />}
                            {<FontAwesomeIcon icon={faStar} />}
                            {<FontAwesomeIcon icon={faStar} />}
                            {<FontAwesomeIcon icon={faStar} />}
                            {<FontAwesomeIcon icon={faStar} />}

                        </div>
                        <div className='reviewDes'>
                            <p>{review.des}</p>

                        </div>

                    </div>

                </>)}

                <div className='writeReview' id='Reviews'>
                    <h3>{title}</h3>
                    <div>
                        <form action="" id='Writereview' onSubmit={handleWriteReview}>
                            <div className='rating'>
                                <span>Bad</span>
                                <input type="radio" name="rating" id="" value={1} /><input type="radio" name="rating" id="" value={2} /><input type="radio" name="rating" id="" value={3} /><input type="radio" name="rating" id="" value={4} /><input type="radio" name="rating" id="" checked value={5} />
                                <span>good</span>
                            </div>
                            <div className='des'>
                                <textarea name="" id="reviewDes" cols="30" rows="10" placeholder='write review'></textarea><br />
                                <input className='submit' type="submit" value="sumit" disabled={Boolean(!user.name)} title='please log in to write review' />

                            </div>

                        </form>


                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;