import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../layout/Footer';
import Nav from '../../layout/Nav';
import AdminSidebar from '../AdminSidebar';
import { isAuthenticated } from '..';
import { API } from '../../../config';
import { Redirect } from 'react-router-dom';

const EditCategory = ({ match }) => {
  const [current, setCurrent] = useState('')
  const [value, setValue] = useState({
    category_name: ''
  })
  const token = isAuthenticated()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    //find Category
    // console.log(match)
    fetch(`${API}/category/findCategory/${match.params.id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          // console.log(data.category_name)
          setCurrent(data.category_name)
        }
      })
      .catch(error => console.log(error))
  }, [match.params.id])

  const redirectTo = () => {
    if (redirect) {
      return <Redirect to={`/admin/category/update/success`} />
    }

  }


  return <>
    <Nav />
    {redirectTo()}
    {/* <div className='container-fluid'> */}
    <div className="row mx-0">
      <div className='col-md-3'>
        <AdminSidebar />
      </div>
      <div className='col-md-9 text-center'>
        <h3>
          Categories
        </h3>
        <hr />
        <h4>Current:</h4>
        <h3>{current}</h3>
        <h4>Change to:</h4>
        <input type="text" onChange={(e) => setValue({ category_name: e.target.value })} />
        <button
          onClick={(e) => {
            e.preventDefault()
            fetch(`${API}/category/updatecategory/${match.params.id}`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
              },
              body: JSON.stringify(value)
            })
              .then(res => res.json())
              .then(data => {
                if (data.error) {
                  console.log(data.error)
                }
                else {
                  setRedirect(true)
                  // console.log("redirect here")
                }
              })
              .catch(error => console.log(error))
          }}
        >Update</button>

      </div>
    </div>
    {/* </div> */}
    <Footer />
  </>;
};

export default withRouter(EditCategory);
