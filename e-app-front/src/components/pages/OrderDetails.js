import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../auth'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { API } from '../../config'
import axios from 'axios'

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch()
  const [order,setOrder]=useState({})
  const { OrderItems, status, totalPrice, city, phone } = order
  const { user, token } = isAuthenticated()

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = axios.post(`${API}/order/orderdetails/${match.params.id}`, config)
    // if (error) {
    //   toast.error(error)
    .then(data=>{
      if(!data){
        console.log(data.error)
      }
      else{
        setOrder(data)
      }})
      .catch(err=>console.log(err))

    }


  ,[])
  return (
    <>
      <Nav />
      <div className='container'>
        <h2>Order Details</h2>
        <hr />
        <h3>Shipping info</h3>
        <p>Name:<b>
          {/* {user.name} */}
        </b></p>
        {/* <p>Phone:<b>{phone}</b></p>
        <p>Address:<b>,{city}</b></p> */}
      </div>

      <Footer />

    </>
  )
}

export default OrderDetails