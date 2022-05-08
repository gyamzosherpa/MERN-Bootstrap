import React from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addItemToCart } from '../../actions/cartActions'
import { removeItemFromCart } from '../../actions/cartActions'
import { withRouter } from 'react-router-dom'

const Cart = ({history}) => {
    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)

    const increaseQnty = (id, quantity, stock) => {
        const newQnty = quantity + 1
        if (newQnty > stock) {
            return;
        }
        dispatch(addItemToCart(id, newQnty))
    }

    const decreaseQnty = (id, quantity, stock) => {
        const newQnty = quantity - 1
        if (newQnty == 0) {
            return;
        }
        dispatch(addItemToCart(id, newQnty))
    }

    const removeFromCart = (id, name) => {
        dispatch(removeItemFromCart(id))
        toast.success(`${name} has been removed from cart.`)
    }

    return (
        <>
            <Nav />

            <ToastContainer position='top-center' theme='colored' />
            {/* <!-- start of cart items  --> */}
            {/* <div className="container"> */}
            <div className="row m-auto">
                {cartItems.length === 0 ?
                    <div className='text-center'><h2>No items in Cart</h2></div>
                    :
                    <>
                        <div className="col-md-8 m-auto p-3 mt-3">
                            <h4>No. of Items in Cart: {cartItems.length}</h4>
                            <table className="table table-hover table-bordered table-striped">
                                <thead >
                                    <tr>
                                        <th className="p-3 ">Product Name</th>
                                        <th className="p-3 ">Price</th>
                                        <th className="p-3 ">Image</th>
                                        <th className="p-3 ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, i) => (
                                        <tr>
                                            <th className="p-3 ">{item.name}</th>
                                            <th className="p-3 ">{item.price}</th>
                                            <th className="p-3 "><img src={`http://localhost:5000/${item.image}`} alt="" height="100px" /></th>
                                            <th className="p-3 d-flex">
                                                <button className='btn btn-danger' onClick={() => {
                                                    decreaseQnty(item.product, item.quantity, item.stock)
                                                }}>-</button>
                                                <input type={'number'} value={item.quantity} className='form-control w-25 text-center' readOnly />
                                                <button className='btn btn-success' onClick={() => {
                                                    increaseQnty(item.product, item.quantity, item.stock)
                                                }}>+</button>
                                                <button className="btn btn-warning" onClick={() => {
                                                    removeFromCart(item.product, item.name)
                                                }}>Remove</button></th>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-2 my-5'>
                            <h4>Order Summary</h4>
                            <hr />
                            {/* {console.log(cartItems)} */}
                            <p>Cart Summary: {
                                cartItems.reduce((acc, item) =>

                                    (acc + Number(item.quantity)),0
                                )
                            }</p>
                            <p>Total Price: {
                                cartItems.reduce((acc, item) =>

                                    (acc + Number(item.price * item.quantity)), 0
                                )
                            }</p>
                            <button className='btn btn-warning' onClick={()=>{
                                history.push('/signin?redirect=/user/checkout')
                            }}>Checkout</button>

                        </div>
                        <div className='col-md-1'></div>
                    </>

                }
            </div>
            {/* </div> */}

            {/* <!-- end of cart items  -->    */}
            <Footer />
        </>
    )
}

export default withRouter(Cart)
