import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth_context';
import './account.css'

const Account = () => {
    const { user } = useAuthContext()
    return (
        <div className='accountContainer'>
            <div className='navigator'>
                <div><Link to='/account/orders'>Orders</Link></div>
                <div><Link to='/account/purchasehistory'>Purchase History</Link></div>
               <div> <Link to='/account/changepassword'>changepassword</Link></div>
              

            </div>
            <div className='details'>
                <span>Hellow ,</span>
                <h1>{user.name}</h1>
                <Outlet></Outlet>


            </div>


        </div>
    );
};

export default Account;