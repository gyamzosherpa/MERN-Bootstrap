import React, {useState} from 'react'

const Categories = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])
    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        setChecked(newCheckedCategoryId)
        // console.log(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId,'category')
    }

  return (
    <>
    <h4>Categories</h4>
    {categories.map((category,i)=>(
        // {console.log(category.category_name)}
        <div className='form-check'>
            <input className='form-check-input' type='checkbox' value={category._id} id={i}
            onChange={handleToggle(category._id)}/>
            <label for={i} className='form-check-label'>{category.category_name}</label>
        </div>
    ))

    }
    
    </>
  )
}

export default Categories