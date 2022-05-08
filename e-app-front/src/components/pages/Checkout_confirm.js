import React from 'react'
import { Link } from 'react-router-dom'

const Checkout_confirm = ({ shipping, confirmOrder, payment }) => {
    return (
        <>
            <div className='p-3 my-3'>
                <div className='d-flex justify-content-evenly'>
                    {
                        shipping ?
                            <Link to='/user/checkout'>
                                <button className='btn btn-warning'>Shipping info</button>
                            </Link>
                            :
                            <Link to='#'>
                                <button className='btn btn-light disabled'>Shipping info</button>
                            </Link>
                    }

                    {
                        confirmOrder ?
                            <Link to='/user/confirm_order'>
                                <button className='btn btn-warning'>Confirm Order</button>
                            </Link>
                            :
                            <Link to='#'>
                                <button className='btn btn-light disabled'>Confirm Order</button>
                            </Link>
                    }

                    {
                        payment ?
                            <Link to='/payment'>
                                <button className='btn btn-warning'>Payment</button>
                            </Link>
                            :
                            <Link to='#'>
                                <button className='btn btn-light disabled'>Payment</button>
                            </Link>
                    }

                </div>
            </div>
        </>
    )
}

export default Checkout_confirm