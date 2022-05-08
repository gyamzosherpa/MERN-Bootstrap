import { API } from "../../config";

// to fetch product by arrival date in descending order
export const getProducts = (sortBy) => {
    return fetch(`${API}/products/productlist?sortBy=${sortBy}&order=desc`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>console.log(error))
}

// to fetch product detail
export const getProductDetails = (productId) =>{
    return fetch(`${API}/products/productdetails/${productId}`,{
        method:'GET'
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// to get related product
export const listRelated = (productId) => {
    return fetch(`${API}/products/product/related/${productId}`,{
        method:'GET'
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// to filter product by category and price
export const getFilteredProducts = (skip, limit, filters={})=>{
    let data = {limit,skip,filters}

    return fetch(`${API}/products/filterproduct`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(error=>console.log(error))
}