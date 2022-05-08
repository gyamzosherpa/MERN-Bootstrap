import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import Footer from '../../layout/Footer'
import AdminSidebar from '../AdminSidebar'
import { isAuthenticated } from '..'
import { getCategories } from '../Category/apiCategory'
import { createProduct } from './apiProduct'

const AddProduct = () => {

    const { token } = isAuthenticated()
    const [categories, setCategories] = useState([])
    const [values, setValues] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: '',
        countInStock: '',
        category: '',
        error: '',
        success: false,
        formData: ''
    })

    const { product_name, product_price, product_description, product_image, countInStock, category, error, success, formData } = values

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setValues({...values, formData: new FormData})
                    // console.log(categories)
                }
            })
            .catch(error => console.log(error))
    }, [])

    const handleChange = name => event => {
        const value = name  === 'product_image'? event.target.files[0] :event.target.value
        formData.set(name, value)
        // console.log(name,value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = event => {
        event.preventDefault()

        setValues({ ...values, error: '' })
        createProduct(token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values, product_name: '', product_price: '', product_description: '', countInStock: '', product_image: '', success: true, error: ''
                    })
                }
            })
            .catch(error => console.log(error))
    }

    // to show error message
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    // to show success msg
    const showSuccess = () => (
        <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>New Product Added</div>
    )




    return (
        <div>
            <Nav />
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-md-3'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-4 mt-3'>
                        {showError()}
                        {showSuccess()}
                        <div className='form-floating mt-2'>
                            <input className='form-control' type="text" id="product_name" placeholder='product name' onChange={handleChange('product_name')} value={product_name} />
                            <label htmlFor='product_name'>Product Name</label>
                        </div>
                        <div className='form-floating mt-2'>
                            <input className='form-control' type="number" id="product_price" placeholder='product price' onChange={handleChange('product_price')} value={product_price} />
                            <label htmlFor='product_price'>Product Price</label>
                        </div>
                        <div className='form-floating mt-2'>
                            <input className='form-control' type="number" id="product_count" placeholder='product count' onChange={handleChange('countInStock')} value={countInStock} />
                            <label htmlFor='product_count'>Count in Stock</label>
                        </div>
                        <div className='form-floating mt-2'>
                            <input className='form-control' type="text" id="product_desc" placeholder='product desc' onChange={handleChange('product_description')} value={product_description} />
                            <label htmlFor='product_desc'>Product Description</label>
                        </div>
                        <div className='form-floating mt-2'>
                            <input className='form-control' type="file" id="product_image" placeholder='product image' onChange={handleChange('product_image')}  accept="image/*" />
                            <label htmlFor='product_image'>Product Image</label>
                        </div>
                        <div className='form-floating mt-2'>
                            <select className='form-control' type="number" id="product_category" placeholder='product category' onChange={handleChange('category')}>
                                <option></option>
                                {
                                    categories && categories.map((category, i) => (
                                        // console.log(category.category_name)
                                        <option key={i} value={category._id}>{category.category_name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor='product_category'>Product Category</label>
                        </div>


                        <button className='btn btn-info mt-3' onClick={(e) => {
                            clickSubmit(e)


                        }}>Add Product</button>



                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddProduct