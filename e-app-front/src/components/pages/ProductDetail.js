import React, { useState, useEffect } from 'react'
import Nav from '../layout/Nav'
import Footer from '../layout/Footer'
import { getProductDetails, listRelated } from '../User/userAPI'
import Product from '../Product'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../actions/cartActions'

const ProductDetail = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const dispatch=useDispatch()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getProductDetails(props.match.params.productId)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setProduct(data)
                    listRelated(data._id)
                    // console.log("front")
                    // console.log(data.category)
                    .then(data_related=>{
                        if(data_related.error){
                            setError(data_related.error)
                        }
                        else{
                            setRelatedProduct(data_related)
                            console.log(relatedProduct)
                        }
                    })
                }
            })
    }, [props])

    const addToCart =() =>{
        dispatch(addItemToCart(props.match.params.productId, quantity))
        toast.success(`${product.product_name} has been added to cart`)
    }


    return (
        <>
            <Nav />
            <ToastContainer position='top-center' theme='colored'/>

            <div className='container w-75 mx-auto my-5'>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={`http://localhost:5000/${product.product_image}`} className="img-fluid rounded-start" alt={`${product.product_name}`} style={{"height":400}}/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">{product.product_name}</h5>
                            <h6 className="card-text">Rs.{product.product_price}</h6>
                            <h6>{product.product_description}</h6>
                            <button className='btn btn-success'
                            onClick={addToCart}
                            >Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

{
    relatedProduct.length>0 && (
        <div className='container my-3'>
            <h3> Related Product</h3>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                    {relatedProduct.slice(0,4).map((product, i) => 
                        <Product key={i} prod={product}/>
                    )}
                </div>
        </div>
    )
}


            <Footer />
        </>
    )
}

export default ProductDetail