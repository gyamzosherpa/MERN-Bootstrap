import React, { useState } from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { countries } from 'countries-list'
import { withRouter } from 'react-router'
import { saveShippingInfo } from '../../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Checkout_confirm from './Checkout_confirm'

const Checkout = ({ history }) => {
    const countriesList = Object.values(countries)
    const {cartItems, shipping_info} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const [shippingAddress1, setShippingAddress1] = useState(shipping_info.shippingAddress1)
    const [shippingAddress2, setShippingAddress2] = useState(shipping_info.shippingAddress2)
    const [country, setCountry] = useState(shipping_info.country)
    const [city, setCity] = useState(shipping_info.city)
    const [zipcode, setZipcode] = useState(shipping_info.zipcode)
    const [phone, setPhone] = useState(shipping_info.phone)

    const checkout = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ shippingAddress1, shippingAddress2, country, city, zipcode, phone }))
        history.push('/user/confirmorder')
    }


    return (
        <>
            <Nav />
            <div className='row'>
            <div className="col-md-8 m-auto p-3 mt-3">
                <div className='container w-75 p-5 my-5 shadow-lg'>
                    <Checkout_confirm shipping />
                    <h3>Shipping Address:</h3>
                    <form>
                        <div className='form-floating my-3'>
                            <input type={'text'} className='form-control' placeholder='shipping Address 1' id='shippingAddress1' onChange={e => setShippingAddress1(e.target.value)} value={shippingAddress1} />
                            <label htmlFor='shippingAddress1'>Shipping Address 1</label>
                        </div>

                        <div className='form-floating my-3'>
                            <input type={'text'} className='form-control' placeholder='shipping Address 2' id='shippingAddress2' onChange={e => setShippingAddress2(e.target.value)} value={shippingAddress2} />
                            <label htmlFor='shippingAddress2'>Shipping Address 2</label>
                        </div>

                        <div className='form-floating my-3'>
                            <select className='form-control' onChange={e => setCountry(e.target.value)}>
                                <option></option>
                                {countriesList.map(c => <option value={c.name} >{c.name}</option>)}
                            </select>
                            <label>country</label>
                        </div>

                        <div className='form-floating my-3'>
                            <input type={'text'} className='form-control' placeholder='city' id='city' onChange={e => setCity(e.target.value)} value={city} />
                            <label htmlFor='city'>city</label>
                        </div>

                        <div className='form-floating my-3'>
                            <input type={'text'} className='form-control' placeholder='zip code' id='zip' onChange={e => setZipcode(e.target.value)} value={zipcode} />
                            <label htmlFor='zip'>zip code</label>
                        </div>

                        <div className='form-floating my-3'>
                            <input type={'text'} className='form-control' placeholder='phone' id='phone' onChange={e => setPhone(e.target.value)} value={phone} />
                            <label htmlFor='phone'>Phone</label>
                        </div>

                        <button className='btn btn-warning form-control' onClick={checkout}>Continue</button>


                    </form>
                </div>
            </div>
            <div className='col-md-2 my-5 p-3'>
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
                                history.push('/signin?redirect=/user/confirmorder')
                            }}>Confirm Order</button>

                        </div>
                        <div className='col-md-1'></div>

            </div>
            <Footer />
        </>
    )
}

export default withRouter(Checkout)