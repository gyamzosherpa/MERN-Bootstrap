import React from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import AdminSidebar from './AdminSidebar';
// import { isAuthenticated } from './index'

const AdminDashboard = () => {
  // const { user: { name, email } } = isAuthenticated()
  return <>
    <Nav />
    {/* <div className='container-fluid'> */}
      <div className="row">
        <div className='col-md-3'>
          <AdminSidebar />
        </div>
        <div className='col-md-9'>

        </div>
      </div>
    {/* </div> */}
    <Footer />
  </>;
};

export default AdminDashboard;
