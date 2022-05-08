import React from 'react'
import { useSelector } from 'react-redux'
import { Fragment } from 'react/cjs/react.development'
import { isAuthenticated } from '../auth'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import Checkout_confirm from './Checkout_confirm'
import { Link } from 'react-router-dom'

const ConfirmOrder = ({history}) => {
    const { cartItems, shipping_info } = useSelector(state => state.cart)
    const { user } = isAuthenticated()

    const totalPrice = cartItems.reduce((ac, item) => (ac + item.quantity * item.price), 0)

    const processToPayment=()=>{
        const data={
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        history.push('/signin?redirect=/payment')    }

    return (
        <>
            <Nav />
            <div className='row'>
                <div className="col-md-8 m-auto p-3 mt-3">
                    <div className='container w-75 p-5 my-5 shadow-lg'>
                        <Checkout_confirm shipping confirmOrder />
                        <div className='col-md-12 shadow-lg p-3'>
                            <h2>Shipping Info</h2>
                            <hr />
                            <div className='col-md-12'>
                                <div>Name: <b>{user.name}</b></div>
                                <div>Email: <b>{user.email}</b></div>
                                <div>Country: <b>{shipping_info.country}</b></div>
                                <div>City: <b>{shipping_info.city}</b></div>
                                <div>Phone: <b>{shipping_info.phone}</b></div>
                                <div>shippingAddress : <b>{shipping_info.shippingAddress1}</b></div>
                                <div>shippingAddress (alternate): <b>{shipping_info.shippingAddress2}</b></div>
                                <hr />

                            </div>
                            <h2>Cart Items</h2>
                            <hr />
                            <div className='col-md-12 text-center'>
                                {
                                    cartItems.map((item, i) => (
                                        <Fragment key={i}>
                                            <div className='row align-items-center'>
                                                <div className='col-md-5'>
                                                    <img src={`http://localhost:5000/${item.image}`} alt={item.name} height="75" />
                                                </div>
                                                <div className='col-md-3'>
                                                    <Link className='text-decoration-none text-muted' to="">{item.name}</Link>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p className='text-primary'>
                                                        Rs. {item.price}x{item.quantity} = Rs.{item.price * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>



                    </div>
                </div>
                <div className='col-md-2 my-5 p-3'>
                    <h4>Order Summary</h4>
                    <hr />
                    {/* {console.log(cartItems)} */}
                    <p>Cart Summary: {
                        cartItems.reduce((acc, item) =>

                            (acc + Number(item.quantity)), 0
                        )
                    }</p>
                    <p>Total Price: {
                        cartItems.reduce((acc, item) =>

                            (acc + Number(item.price * item.quantity)), 0
                        )
                    }</p>
                    <button className='btn btn-warning' onClick={() => processToPayment()}>To Payment</button>

                </div>
                <div className='col-md-1'></div>

            </div>
            <Footer />
        </>
    )
}

export default ConfirmOrder