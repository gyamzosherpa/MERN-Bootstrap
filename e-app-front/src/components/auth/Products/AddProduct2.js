import React, { useState, useEffect } from 'react';
import Footer from '../../layout/Footer';
import Nav from '../../layout/Nav';
import AdminSidebar from '../AdminSidebar';
import { isAuthenticated } from '..';
import { getCategories } from '../Category/apiCategory';
// import { getCategories } from '../category/apiCategory';
import { createProduct } from './apiProduct';
import { Redirect } from 'react-router-dom';

const AddProduct = () => {
    const { token } = isAuthenticated();

    const [redirect, setRedirect] = useState(false);

    const [values, setValues] = useState({
        product_name: '',
        product_price: '',
        countInStock: '',
        product_description: '',
        product_image: '',
        category: '',
        error: '',
        success: '',
        formData: '',
    });

    const {
        product_name,
        product_price,
        product_description,
        product_image,
        countInStock,
        category,
        error,
        success,
        formData,
    } = values;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setCategories(data);
                    setValues({ ...values, formData: new FormData() });
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = (name) => (event) => {
        const value =
            name === 'product_image' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        console.log(value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();

        //setValues({ ...values, error: '' });
        createProduct(token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setRedirect(
                        true
                        // ...values,
                        // product_name: '',
                        // product_price: '',
                        // product_description: '',
                        // countInStock: '',
                        // category: '',
                        // product_image: '',
                        // success: true,
                        // error: '',
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    //error message
    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    );

    //show success
    const showSuccess = () => (
        <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
        >
            New Product added
        </div>
    );

    const redirectTo = () => {
        if (redirect) {
            <Redirect to="/admin/product"></Redirect>;
        }
    };

    return (
        <>
            <Nav />

            <div className="dashboard container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        {showError()}
                        {redirectTo()}
                        <h3>Create Products</h3>
                        <div className="form-floating mt-3 w-50">
                            <input
                                className="form-control border-2 border-danger"
                                type="text"
                                id="product_name"
                                placeholder="product name"
                                onChange={handleChange('product_name')}
                                value={product_name}
                            />
                            <label htmlFor="product_name">Product Name</label>
                        </div>

                        <div className="form-floating mt-3 w-50">
                            <input
                                className="form-control border-2 border-danger"
                                type="number"
                                id="product_price"
                                placeholder="price"
                                onChange={handleChange('product_price')}
                                value={product_price}
                            />
                            <label htmlFor="product_price">Product Price</label>
                        </div>

                        <div className="form-floating mt-3 w-50">
                            <input
                                className="form-control border-2 border-danger"
                                type="number"
                                id="countInStock"
                                placeholder="stock"
                                onChange={handleChange('countInStock')}
                                value={countInStock}
                            />
                            <label htmlFor="countInStock">Stock</label>
                        </div>

                        <div className="form-floating mt-3 w-50">
                            <textarea
                                className="border-2 border-danger w-100"
                                rows="4"
                                id="product_description"
                                placeholder="describe your product"
                                onChange={handleChange('product_description')}
                                value={product_description}
                            ></textarea>
                        </div>

                        <div className="form-floating mt-3 w-50">
                            <input
                                className="form-control border-2 border-danger"
                                type="file"
                                id="product_image"
                                onChange={handleChange('product_image')}
                                accept="image/*"
                            />
                        </div>

                        <input
                            className="form-control border-2 border-danger mt-3 w-50"
                            list="datalistOptions"
                            id="category"
                            placeholder="Type to search categories ..."
                        />
                        <select id="datalistOptions"
                            onChange={handleChange('category')}>
                            <option></option>
                            {
                                categories && categories.map((category, i) => (
                                    // console.log(category.category_name)
                                    <option key={i} value={category._id}>{category.category_name}</option>
                                ))
                            }
                        </select>

                        <button
                            className="btn btn-success mt-3 mb-4"
                            onClick={(e) => {
                                clickSubmit(e);
                            }}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AddProduct;
