import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import './navbar.css'
import { signout } from '../auth'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Nav = ({history}) => {
    const {cartItems} = useSelector(state=>state.cart)
    const { user } = isAuthenticated()
    return (
        <>
            <div className="container-fluid">
                <div className="row navbar-header d-flex align-items-center ">
                    <div className="col-md-3"><Link className="navbar-brand text-white" to="/">My Online Store</Link></div>
                    <div className="col-md-6">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-warning" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-md-3">
                        <ul className="d-flex list-unstyled justify-content-evenly pt-2">
                            
                            
                            
                            {
                                isAuthenticated() &&
                                <li className="px-2"><Link className="text-decoration-none " to="/" onClick={()=>signout(()=>{
                                    history.push('/')
                                })}>
                                        <i className="bi bi-box-arrow-left text-white fs-3"></i>
                                    </Link></li>
                            }


                            {
                                user && user.isAdmin &&
                                <a href='/admin/dashboard'>
                                    <i className="bi bi-keyboard fs-3 text-white"></i>
                                </a>

                            }

                            {
                                user && !user.isAdmin &&
                                <h1>profile</h1>
                            }
                            
                            
                            
                            {!isAuthenticated() &&
                                <>
                                    <li className="px-2"><Link class="text-decoration-none" to="/signin">
                                        <i className="bi bi-box-arrow-in-left text-white fs-3"></i>
                                    </Link></li>
                                    <li><Link clasName="text-decoration-none" to="/signup">
                                        <i className="bi bi-person-plus text-white fs-3"></i>
                                    </Link></li>
                                </>
                            }
                            <li><Link className="text-decoration-none" to="/cart">
                                <i className="bi bi-cart text-white fs-3 position-relative">
                                    <span className='position-absolute top-0 start-100 bg-warning badge rounded-pill translate-middle text-dark' style={{fontSize:'10px'}}>
                                        <span>{cartItems.length}</span>
                                    </span>
                                </i>
                            </Link></li>
                        </ul>
                    </div>

                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav-sub">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  text-white" to="/deals">Deals</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  text-white" to="/customerservice">Customer Service</Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default withRouter(Nav)
