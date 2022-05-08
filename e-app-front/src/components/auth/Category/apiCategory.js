import { API } from "../../../config";

// to add category
export const createCategory = (token, category) => {
    // console.log(category)
    return fetch(`${API}/category/addcategory`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => response.json())
    .catch(error=>console.log(error))   
}

// to get all categories
export const getCategories = () =>{
    return fetch(`${API}/category/categories`,{
        method:"GET"
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}

//  to delete category
export const deleteCategory = (id, token) =>{
    return fetch(`${API}/category/deletecategory/${id}`,{
        method:"Delete",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}