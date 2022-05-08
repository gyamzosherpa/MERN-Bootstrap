import React from 'react'
import { isAuthenticated, signout } from '.'
import { withRouter } from 'react-router-dom'

const AdminSidebar = ({history}) => {
const {user:{email,name}} = isAuthenticated()

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ 'width': '280px' }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Sidebar</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link active" aria-current="page">

                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/admin/category" className="nav-link text-white">
                            Category
                        </a>
                    </li>
                    <li>
                        <a href="/admin/products" className="nav-link text-white">
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Orders
                        </a>
                    </li>
                    <li>
                        <a href="/admin/product/add" className="nav-link text-white">
                            Add Products
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Users
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <strong>{name}</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li className="dropdown-item">{email}</li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={() => signout(() => {
                            history.push('/')
                        })} href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default withRouter(AdminSidebar)