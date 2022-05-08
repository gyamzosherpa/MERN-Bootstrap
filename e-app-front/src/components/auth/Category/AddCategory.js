import React from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../layout/Footer';
import Nav from '../../layout/Nav';
import AdminSidebar from '../AdminSidebar';
import { isAuthenticated } from '..';
import { useState } from 'react'
import { createCategory } from './apiCategory'
// import { Redirect } from 'react-router-dom';



const AddCategory = ({ history }) => {
  const user = isAuthenticated()
  const [category_name, setCategory] = useState('')
  // const [redirect, setRedirect] = useState(false)
  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)
  
  // to show error msg
  const showError = () =>(
    <div className='alert alert-danger' style={{display: error?'':'none'}}>{error}</div>
  )

  // to show success msg
  const showSuccess = () => (
    <div className='alert alert-success' style={{ display: success?'':'none'}}>New Category Added</div>
  )

  

  return <>
    <Nav />
    <div className='container-fluid'>
    <div className="row">
      <div className='col-md-3'>
        <AdminSidebar />
      </div>
      <div className='col-md-9'>
        <h3>
          Categories
        </h3>
        {showError()}
        {showSuccess()}
        <div className='col-md-3 text-center mt-5'>
          <div className='form-floating'>
            <input type='text' className='form-control' id='categoryName' placeholder='category' onChange={(e) => setCategory(e.target.value)} value={category_name}/>
            <label htmlFor='categoryName'>Category Name</label>
          </div>
          <button className='btn btn-info mt-3' onClick={() => {
            // console.log(user.token)
            createCategory(user.token, { category_name })
              .then(data => {
                if (data.error) {
                  // return console.log(data.error)
                  setError(data.error)
                  setSuccess(false)
                }
                else {
                  setError(false)
                  setSuccess(true)
                  setCategory('')

                }
              })
          }}>Add Category</button>
        </div>


      </div>
    </div>
    </div>
    <Footer />
  </>;
};

export default withRouter(AddCategory);
