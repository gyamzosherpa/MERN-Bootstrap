import React, { useState,useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../layout/Footer';
import Nav from '../../layout/Nav';
import AdminSidebar from '../AdminSidebar';
import { isAuthenticated } from '..';
import { deleteCategory, getCategories } from './apiCategory';

const Category = () => {
    // const {user:{name,email}}=isAuthenticated()
    const [categories, setCategories] =useState([])
    const [success,setSuccess] = useState(false)

    useEffect(()=>{
      getCategories()
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }
        else{
          setCategories(data)
          setSuccess(false)
        }
      })
    },[success])



  return <>
  <Nav/>
  {/* <div className='container-fluid'> */}
  <div className="row mx-0">
    <div className='col-md-3'>
        <AdminSidebar/>
    </div>
    <div className='col-md-9 text-center'>
            <h3>
            Categories
            </h3>
            <a className='btn btn-secondary' href='/admin/category/add'>Add Category</a>
            <table className='table table-hover table-striped w-50 mx-auto mt-3'>
              <thead>
                <th>S.No.</th>
                <th>Category Name</th>
                <th>Action</th>
              </thead>
              <tbody>
                {categories.map((category,i)=>(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <a className='btn btn-info' href={`/admin/category/edit/${category._id}`}>Edit</a>
                      <button className='btn btn-danger' onClick={()=>{
                        // console.log(isAuthenticated())
                        deleteCategory(category._id,isAuthenticated().token)
                        .then(()=>setSuccess(true))
                        
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
  </div>
  {/* </div> */}
  <Footer/>
  </>;
};

export default withRouter(Category);
