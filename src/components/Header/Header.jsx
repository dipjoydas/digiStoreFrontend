import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faCodeCompare } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import HeaderStyle from './HeaderStyle';
import HambergerStyle from './HambergerStyle';
import Accordion from './Accordion';
import Modal from './Modal';
import AddToCart from '../AddToCart/AddToCart';
import { useAuthContext } from '../../context/Auth_context';
import { useCompareContext } from '../../context/Compare_context';

const Header = () => {
    const [categorydata, setCategorydata] = useState({})
    const { user, logOut } = useAuthContext()
    const [searchResult, setSearchResult] = useState()
    const {toastContent} =useCompareContext()
    
    useEffect(() => {

        fetch('http://localhost:5000/productcategory')
            .then(response => response.json())
            .then(data => setCategorydata(data))

    }, [])
    // hide cart -------------------------------------------------------------------------------
    const hideCart = () => {

        const cartContainer = document.getElementsByClassName('addtoCartContainer')[0]
        cartContainer.classList.toggle('active')

    }





    const category = [



        {
            id: 1,
            mainCategory: 'computer',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'digi-pc',
                    subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'brand-pc',
                    subCategory: ['dell', 'hp','lenevo','acer']
                },
                {
                    id: 1,
                    mainCategory: 'gaming-pc',
                    subCategory: ['intel', 'amd']
                },
            ]
        },
        {
            id: 1,
            mainCategory: 'laptop',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'gaming-laptop',
                    subCategory: ['dell', 'hp','lenevo','acer']
                },
                {
                    id: 1,
                    mainCategory: 'laptop-bag',
                    subCategory: ['max-green', 'hp','asus','msi']
                },
                
            ]
        },
        {
            id: 1,
            mainCategory: 'component',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'processor',
                    subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'ram',
                    subCategory: ['gigabyte', 'gskill','adata']
                },
                {
                    id: 1,
                    mainCategory: 'motherboard',
                    subCategory: ['gigabyte', 'msi','asus']
                },
            ]
        },
        {
            id: 1,
            mainCategory: 'monitor',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'hp',
                    
                },
                {
                    id: 1,
                    mainCategory: 'dell',
                   
                },
                {
                    id: 1,
                    mainCategory: 'samsung',
                  
                },{
                    id: 1,
                    mainCategory: 'lg',
                }
            ]
        },
        {
            id: 1,
            mainCategory: 'ups',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'max-green',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'value top',
                    // subCategory: ['intel', 'amd']
                },
                
            ]
        },
        {
            id: 1,
            mainCategory: 'tablet',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'lenevo',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'realme',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'xiaomi',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'samsung',
                    // subCategory: ['intel', 'amd']
                },
            ]
        },
        {
            id: 1,
            mainCategory: 'accessories',
            subCategory: [
                {
                    id: 1,
                    mainCategory: 'key-board',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'mouse',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'headphone',
                    // subCategory: ['intel', 'amd']
                },
                {
                    id: 1,
                    mainCategory: 'pen drive',
                    // subCategory: ['intel', 'amd']
                },
            ]
        },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //     ]
        // },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //     ]
        // },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //     ]
        // },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         },
        //     ]
        // },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         }
        //     ]
        // },
        // {
        //     id: 1,
        //     mainCategory: 'computer',
        //     subCategory: [
        //         {
        //             id: 1,
        //             mainCategory: 'star pc',
        //             subCategory: ['intel', 'amd']
        //         }
        //     ]
        // },

    ]


    const handleSearch = async (e) => {
        const searchValue = e.target.value
        try {
            const res = await fetch(`http://localhost:5000/productsearch?search=${searchValue}`)
            const result = await res.json()

            setSearchResult(result)

        } catch (error) {

        }


    }
    const clearInput = () => {
        const element = document.getElementById('search')
        element.value = ''
        setSearchResult([])

    }
    // const hideresult =(e)=>{
    //     const element = document.getElementsByClassName('searchResultContainer')[0]

    //     element.style.display = 'none'


    // }
    // const displayResult =()=>{
    //     const element = document.getElementsByClassName('searchResultContainer')[0]
    //     element.style.display = 'flex'


    // }
    const handleResSearch = () => {
        const element = document.getElementsByClassName('resSearchBar')[0]


        element.classList.toggle('active')
    }
    return (

        <div className='header'>
            <HeaderStyle></HeaderStyle>
            <div className='header1'>
                <div className='logoContainer' >
                    <img src="https://i.ibb.co/KD1DJ8y/5f50fc30a90e9-profile-picture.png" alt="" srcset="" />
                </div>
             
                <div className='inputContainer'>
                    <input type="text" name="" id="search" onKeyUp={handleSearch} placeholder='search' />
                   
                    <div className='searchResultContainer'>

                        {searchResult?.map((product, index) => <Link to={`/productdetails/${product._id}`} onClick={clearInput}>
                            <div key={index} className='sRItem'>
                                <div className='imgContainer'>
                                    <img src={"http://localhost:5000/getimage/" + product.img} alt="" />

                                </div>
                                <div className='sRTextContainer'>
                                    {product?.title}




                                </div>

                            </div>

                        </Link>)}





                    </div>
                </div>

                <div className='links'>
                    <Link className='link' to='/offers'>Offers</Link>
                    <Link className='link' to='/deal'>Special Deal</Link>
                    {user?.name && <Link className='link' to='/account'>Account</Link>}
                    {user?.name ? <button onClick={() => logOut()}>log out{user?.name}</button> : <Link className='link' to='signup'>Sign up/Log in</Link>}
                    {/* <Link className='link' to='signup'>Sign up/Log in</Link> */}

                </div>
            </div>
            <div className='header2'>



                {category.map((item, index) =>
                    <div key={index} className='dropdown'>
                        <Link className='dropbtn link' to={`categories/${item.mainCategory}`}>{item.mainCategory}</Link>
                        <div className='dropdownContent'>
                            {item.subCategory?.map((item2, index) =>
                                <div key={index} className='dropdown2'>
                                    <Link className='dropdownbtn2 link' to={`categories/${item.mainCategory}/${item2.mainCategory}`}>{item2.mainCategory}</Link>
                                    <div className='dropdownContent2'>
                                        {item2.subCategory?.map((item3, index) => <Link key={index} className='link' to={`categories/${item.mainCategory}/${item2.mainCategory}/${item3}`}>{item3}</Link>)}
                                    </div>
                                </div>)}
                        </div>
                    </div>)}












                {/* item2.subCategory.map(item3=><Link to={item3}>{item3}</Link> */}
                {/* // <Link to={item.subCategory}></Link> */}









            </div>
            {/* responsive header part for  */}
            <HambergerStyle></HambergerStyle>
            <div className='resHeader1'>
                <div className="hambergerContainer">
                    <div className="menuhumberger"></div>
                </div>
                <div className='logoContainer'>
                    <img src="https://i.ibb.co/KD1DJ8y/5f50fc30a90e9-profile-picture.png" alt="" />

                </div>
                <div className='lastContainer'>

                    <Link to='/account' className='dashbord'>Account</Link>
                    <FontAwesomeIcon className='icon searchbtn' icon={faMagnifyingGlass} onClick={handleResSearch} />
                    <FontAwesomeIcon onClick={hideCart} className='icon' icon={faCartShopping} />

                    {/* /--------------------------------------------------------------------------------- */}
                    <div className='resSearchBar'>
                        <input type="text" name="" className='resinputField' onKeyUp={handleSearch} placeholder='search' />
                        {/* <input type="submit" value="submit" /> */}
                        <div className='searchResultContainer'>

                            {searchResult?.map((product, index) => <Link to={`/productdetails/${product._id}`} onClick={clearInput}>
                                <div key={index} className='sRItem'>
                                    <div className='imgContainer'>
                                        <img src={"http://localhost:5000/getimage/" + product.img} alt="" />

                                    </div>
                                    <div className='sRTextContainer'>
                                        {product?.title}




                                    </div>

                                </div>

                            </Link>)}





                        </div>
                    </div>

                    <input className='resSearchBar' type="text" name="" id="" placeholder='search' onKeyUp={handleSearch} />



                </div>
                {/* category content //////////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className='modal'>
                    <div className='accordionsContainer'>
                        <Modal></Modal>
                        <Accordion></Accordion>

                        {category.map((item, index) =>
                            <div key={index} className='accordionContainer'>
                                <div className='accordion'>{item.mainCategory}</div>

                                <div className='panel'>
                                    <Link className='link res' to={`categories/${item.mainCategory}`}>{item.mainCategory}</Link>
                                    {item.subCategory?.map((item2, index) =>

                                        <div key={index} className='accordionContainer'>
                                            <div className='accordion'>{`${item2.mainCategory}`}</div>
                                            <div className='panel'>
                                                <Link className='link res' to={`categories/${item.mainCategory}/${item2.mainCategory}`}>{item2.mainCategory}</Link>
                                                <div className='drop'>
                                                    {item2.subCategory?.map((item3, index) => <div key={index}><Link className='link res' to={`categories/${item.mainCategory}/${item2.mainCategory}/${item3}`}>{item3}</Link></div>)}
                                                </div>

                                            </div>



                                        </div>)}
                                </div>
                            </div>)}

                    </div>
                </div>




            </div>
            {/* responsive header 2 -------------------------------------------------------------------------------------------- */}
            <div className='resHeader2'>
                <Link to='/compare'className='link'> Compare</Link>
                <Link className='link' to='/offers'>Offers</Link>
                <Link className='link' to='/deal'>Special Deal</Link>
                {user?.name ? <button onClick={() => logOut()}>log out{user?.name}</button> : <Link className='link' to='signup'>Sign up/Log in</Link>}
            </div>


            {/* add to cart part ----------------------------------------------------------- */}
            {/* triger add to cart */}
            <div className='trigerAddToCart' >
                <FontAwesomeIcon onClick={hideCart} className='icon' icon={faCartShopping} />

            </div>
            <div className='compare'>
                <Link to='/compare'> <FontAwesomeIcon className='icon Compare' icon={faCodeCompare} /></Link>


            </div>
            <AddToCart hideCart={hideCart}></AddToCart>
            {/*-------------------------------------- add to toster --------------------------------------------------- */}
            {toastContent?<div className='toast'>
                <p>{toastContent}</p>
                
                
               </div>:''}



        </div>
    );
};

export default Header;