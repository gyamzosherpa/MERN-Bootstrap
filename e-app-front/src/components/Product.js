import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({prod}) => {
  return (
    <>
      
          
          <div class="col">
              <Link to={`/productdetail/${prod._id}`}>
            <div class="card">
              <img src={`http://localhost:5000/${prod.product_image}`} class="card-img-top" alt={prod.product_name} height={200} />
              <div class="card-body text-center">
                <h5 class="card-title">{prod.product_name}</h5>
                <h6 class="card-text">Rs.{prod.product_price}</h6>
                <h6 class="text-justify">{prod.product_description}</h6>
                
                <button className='btn btn-warning'>View Details</button>
              </div>
            </div>
                </Link>
          </div>
          
        
    </>
  )
}

export default Product
