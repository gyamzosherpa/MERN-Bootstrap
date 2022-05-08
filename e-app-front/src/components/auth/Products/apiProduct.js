import { API } from '../../../config';

// to add product
export const createProduct = (token, product) => {
  // console.log(token)
  return fetch(`${API}/products/postproduct`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// to get all products
export const getProducts = () => {
  return fetch(`${API}/products/productlist`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
