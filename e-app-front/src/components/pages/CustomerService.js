import React from 'react'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'

const CustomerService = () => {
    return (
        <>
        
            <Nav />

            <h2 className="display-6 text-center mb-4">Compare plans</h2>

            <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Free</th>
                            <th>Pro</th>
                            <th>Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="text-start">Public</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-start">Private</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <th scope="row" className="text-start">Permissions</th>
                            <td>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-start">Sharing</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-start">Unlimited members</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-start">Extra security</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    )
}

export default CustomerService
