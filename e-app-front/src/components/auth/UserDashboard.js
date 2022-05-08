import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, myOrders } from '../../actions/orderActions';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import { isAuthenticated } from './index'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { loading, error, orders } = useSelector(state => state.myOrders)
  const { user } = isAuthenticated()

  useEffect(() => {
    dispatch(myOrders())

    if (error) {
      toast.error(error)
      dispatchEvent(clearErrors)
    }
  }, [dispatch, toast, error])
  return <>
    <Nav />
  <div className='container'>
    <div className='row my-5'>
      <div className='col-md-3 shadow-lg p-5'>
  <h1>User Profile</h1>
  <hr/>
  <h3 className='px-2'>Name:{user.name}</h3>
  <hr/>
  <h4 className='px-2'>Email:{user.email}</h4>
  {/* <hr/> */}

      </div>

    <div className='col-md-8'>
    <div className='d-flex justify-content-center'>
      <div className='col-md-10'>
        <h2 className='text-center text-muted'>My Orders History</h2>
        <table className='table text-center table-bordered'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Number of Items</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order,i)=>(
              <tr>

                <td>111{order._id}</td>
                <td>{order.OrderItems.length}</td>
                <td>{`Rs.${order.totalPrice}`}</td>
                <td>{order.status && String(order.status).includes('delivered')?
                <p style={{color:"green"}}>{order.status}</p>:
                <p style={{color:"red"}}>{order.status}</p>}
                </td>
                <td><Link to ={`/orderdetails/${order._id}`} className='text-decoration-none'>View</Link></td>
              </tr>
            ))}
           
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  </div>

    <Footer />
  </>;
};

export default withRouter(UserDashboard);
