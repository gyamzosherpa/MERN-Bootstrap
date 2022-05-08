import React, {useState} from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { Link } from 'react-router-dom'
import {isAuthenticated, keep_logged, signin} from '../auth'
import {Redirect, withRouter} from 'react-router-dom'

const Signin = ({location, history}) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectTo: false
    })
    const { email, password, error, redirectTo } = values

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const submitForm = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signin({email, password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                keep_logged(data,()=>
                setValues({...values,redirectTo:true}))
            }
        })
        .catch(error=>console.log(error))
    }

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{display:error?'':'none'}}>{error}</div>
    )

    // redirect if successful signin
    const user = isAuthenticated()

    const redirect =()=>{
        const user = isAuthenticated()
        const redirectTo = location.search? location.search.split('=')[1]:'/user/profile'
        if(user && redirectTo){
            // console.log(user.user.isAdmin)
            if(user && user.user.isAdmin){
                // console.log(user)
            return <Redirect to='/admin/dashboard'/>
        }
            else {
                // console.log(user)
                return history.push(redirectTo)
            }
        }
    }

    return (
        <div>
            <Nav />
            {showError()}
            {redirect()}
            <div className="col-md-6 m-auto border border-1 my-3 px-3 shadow-lg rounded-3">
                <form className="mt-2">
                    <center><img className="mb-4" src="./images/img1.jpg" alt="" width="72" height="57" /></center>
                    <h1 className="h3 mb-3 fw-normal">Sign In</h1>


                    <div className="form-floating my-3 shadow-lg">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')}/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating my-3 shadow-lg">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange('password')} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    
                    <center>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me. Do not have an account ?  <Link to="/signup">Sign Up.</Link>
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submitForm}>Sign In</button>
                        <Link to="/forgotpassword">Forgot Password</Link>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </center>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default withRouter(Signin)
