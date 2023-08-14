import React, { useEffect, useState } from 'react';

const PurchaseHistory = () => {
    const [orderHistory, setOrderHistory] = useState()
    useEffect(() => {
        const getOrderHistory = async () => {
            try {
                const Authentication = JSON.parse(localStorage.getItem("token"))
                const res = await fetch('http://localhost:5000/orderhistory', {
                    method: "GET",
                    headers: {
                        "Authentication": Authentication
                    }
                })
                const result = await res.json()

                setOrderHistory(result)

            } catch (error) {

            }

        }
        getOrderHistory()

    }, [])
    return (
        <div className='orderHistoryContainer'>
            <table>
                {orderHistory?.map((order, index) => <div key={index}>
                    <thead>
                        <tr>

                            <th>Order</th>
                            <th>status</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>
                                <p>Order  ID :{order._id}</p>

                                {order?.orders?.map((item, index) => <>

                                    <p>Titte : {item.title}</p>

                                    <p>Quantity: {item.quantity}</p>

                                </>)}


                            </td>
                            <td>

                              
                                {(order.delivered == "deliverd") ? "delivered" : "not delivered"}

                            </td>

                        </tr>
                    </tbody>


                </div>)}
            </table>


        </div>
    );
};

export default PurchaseHistory;