import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import Product from '../Product';
import Trending from '../Trending';
import { getProducts } from '../User/userAPI';

const Home = () => {
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
  }, []);

  return (
    <>
      <Nav />
      <div className="container-fluid mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {productsByArrival.map((product, i) => (
            <Product key={i} prod={product} />
          ))}
        </div>
      </div>
      <Trending />
      <Footer />
    </>
  );
};

export default Home;
