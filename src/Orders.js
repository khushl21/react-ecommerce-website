import React, { useEffect, useState } from 'react';
import { db } from "./firebase";
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
import { useLayoutEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function Orders() {

    let location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
    }, [location.pathname]);

    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user){

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
        else{
            setOrders([])
        }
    }, [])

  return (
    <div className='orders'>
        <h1>Your Orders</h1>

        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders