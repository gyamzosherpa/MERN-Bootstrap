import React, { useState } from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
// import { Link } from 'react-router-dom'
import { signup } from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const { name, email, password, error, success } = values

    const handlechange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const submitForm = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signup({name, email, password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,name:'',email:'',password:'',success:true})
            }
        })
        .catch(error=>console.log(error))
    }

    // to show error
    const showError = () => (
        <div className='aler alert-danger' style={{display:error?'':'none'}}>{error}</div>
    )


    // to show success
    const showSuccess = () =>(
        <div className='aler alert-success' style={{display:success?'':'none'}}>
            New account created. Please verify your account to continue.
        </div>
    )


    return (
        <div>
            <Nav />

            <div className="col-md-6 m-auto border border-1 my-3 px-3 shadow-lg rounded-3">
                <form className="mt-2">
                    <center><img className="mb-4" src="./images/img1.jpg" alt="" width="72" height="57" /></center>
                    <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                    {showError()}
                    {showSuccess()}

                    <div className="form-floating my-3 shadow-lg">
                        <input type="text" className="form-control" id="fname" placeholder="Enter your Name" onChange={handlechange('name')} value={name}/>
                        <label for="fname">Name</label>
                    </div>

                    {/* <div className="form-floating my-3 shadow-lg">
                        <input type="text" className="form-control" id="lname" placeholder="Enter your Last name" />
                        <label for="lname">Last Name</label>
                    </div> */}


                    {/* Gender
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Female
                        </label>
                    </div> */}

                    <div className="form-floating my-3 shadow-lg">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handlechange('email')} value={email} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating my-3 shadow-lg">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlechange('password')} value={password}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    {/* <div className="form-floating my-3 shadow-lg">
                        <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password" />
                        <label for="floatingPasswordConfirm">Confirm Password</label>
                    </div> */}

                    <center>
                        {/* <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Already Have an account. <Link to="/signin">Sign in.</Link>
                            </label>
                        </div> */}
                        <button className="w-100 btn btn-lg btn-primary" onClick={submitForm}>Sign Up</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </center>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default Signup
