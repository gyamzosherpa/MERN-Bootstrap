import React from 'react';
import AdminSidebar from '../AdminSidebar';
import Nav from '../../layout/Nav';
import Footer from '../../layout/Footer';
import { useState, useEffect } from 'react';
import { getProducts } from './apiProduct';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);

  const loadproducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadproducts();
  }, []);

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9 mt-3">
            <table class="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, limit).map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.product_image}`}
                        alt={item.product_name}
                        height="150"
                      ></img>
                    </td>
                    <td>
                      {item.product_name}
                      <br />
                      Rs.{item.product_price}
                      <br />
                      {item.product_description}
                      <br />
                      Available: {item.countInStock}
                    </td>
                    <td>
                      <button className="btn btn-success">Update</button>
                    </td>
                  </tr>
                ))}
                {limit < products.length ? (
                  <tr>
                    <td colSpan={4}>
                      <button
                        className="btn btn-success"
                        onClick={() => setLimit(limit + 4)}
                      >
                        Load more
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4}>All Products loaded</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
