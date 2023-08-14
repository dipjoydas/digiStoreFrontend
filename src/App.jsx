

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import ProductDetails from './components/ProductDetails/ProductDetails'
import LogIn from './components/LogIn/LogIn'
import SIgnUp from './components/SingUp/SIgnUp'
import useAuth from './hooks/useAuth'
import PrivateRoute from './routes/PrivateRoute'
import Checkout from './components/Checkout/Checkout'
import Payment from './components/Payment/Payment'
import Account from './components/Account/Account'
import Orders from './components/Account/Orders'
import PurchaseHistory from './components/Account/PurchaseHistory'
import ChangePassword from './components/Account/ChangePassword'
import ForgetPassword from './components/Account/ForgetPassword'
import VerifyEmail from './components/Account/VerifyEmail'
import CompareProduct from './components/CompareProducts/CompareProduct'

function App() {
  useAuth()
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout></Layout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
         path:'/productdetails/:id',
         element:<ProductDetails></ProductDetails>


        },{
          path:'/verifyemail',
          element:<VerifyEmail></VerifyEmail>

        },{
          path:'/forgetpassword',
          element:<ForgetPassword></ForgetPassword>
        },
        {
          path:'/account',
          element:<PrivateRoute><Account></Account></PrivateRoute>,
          children:[
            {
              path:'/account/orders',
              element:<Orders></Orders>
            },{
              path:'/account/purchasehistory',
              element:<PurchaseHistory></PurchaseHistory>
            },{
              path:'/account/changepassword',
              element:<ChangePassword></ChangePassword>
            },
          ]
        },
        {
          path:'/login',
          element:<LogIn></LogIn>
        },
        {
          path:'/signup',
          element:<SIgnUp></SIgnUp>

        },{
          path:'/checkout',
          element:<PrivateRoute><Checkout></Checkout></PrivateRoute>

        },{
          path:'/payment/:id',
          element:<PrivateRoute><Payment></Payment></PrivateRoute>
        },{
          path:'/compare',
          element:<CompareProduct></CompareProduct>

        },
        {
          path:'/categories/*',
          element:<Products></Products>
        }
      ]
    }
  ])
  return(
    <div>
      <RouterProvider router ={router}></RouterProvider>
    </div>
  )
}

export default App
