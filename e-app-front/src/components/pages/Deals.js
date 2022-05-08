import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCategories } from '../auth/Category/apiCategory'
import Categories from '../Categories'
import Footer from '../layout/Footer'
import Nav from '../layout/Nav'
import { prices } from '../price'
import RadioButtons from '../RadioButtons'
import { getFilteredProducts } from '../User/userAPI'
import Product from '../Product'

const Deals = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [filteredResult, setFilteredResult] = useState([])
    const [limit, setLimit] =useState(4)
    const [skip, setSkip] =useState(0)
    const [size, setSize] = useState(0)
    const [myFilters, setMyFilters] = useState({
        filters:{category:[], price:[]}
    })

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const loadFilteredResults = (newFilters) =>{
        getFilteredProducts(skip, limit, newFilters)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                // console.log(data)
                setFilteredResult(data.product)
                setSize(data.size)
                setSkip(0)
            }
        })
        .catch(error => console.log(error))
    }

    const loadMore =()=>{
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResult([...filteredResult,...data.product])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton =()=>{
        return(
            <div className='text-center'>
            {size>=0 && size >= limit && 
            <button className='btn btn-warning' onClick={loadMore}>Load More</button>}</div>
        )
    }

    const handlePrice = value2 => {
        const data = prices
        let value =[]
        for (let key in data){
            if(data[key]._id == parseInt(value2)){
                value = data[key].value
            }
        }
        return value
    }

    const handleFilters = (filters, filterBy)=>{
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        // console.log(filters)
        if(filterBy==="product_price"){
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy] = priceValue
        }
        loadFilteredResults(myFilters.filters)
        console.log(myFilters.filters)
        setMyFilters(newFilters)
    }

    const init = () =>{
        getCategories()
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setCategories(data)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            <Nav />

            <div className='row'>
                <div className='col-md-3'>
                    <Categories categories={categories} handleFilters={filters =>handleFilters(filters,'category')}/>

                    <br/>
                    <h4>Prices</h4>
                    <RadioButtons prices={prices} handleFilters={filters =>handleFilters(filters,'product_price')}/>
                </div>
                <div className='col-md-9'>

                <div className="container-fluid mt-3">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {filteredResult.map((product, i) => 
                        <Product key={i} prod={product}/>
                    )}
                </div>
            </div>

                </div>
            </div>
            {loadMoreButton()}
            <Footer />
        </>
    )
}

export default Deals