import React, {useState} from 'react'

const RadioButtons = ({prices, handleFilters}) => {
    const [value,setValue] = useState(0)

    const handleChange = event =>{
        handleFilters(event.target.value, 'product_price')
        setValue(event.target.value)
    }

  return (
    <>
    {
        prices.map((price,i)=>(
            <div className='form-check'>
            <input className='form-check-input' type='radio' value={price._id} id={`price${i}`}  name='price'
            onChange={handleChange}/>
            <label for={`price${i}`} className='form-check-label'>{price.name}</label>
        </div>
        ))
    }
    </>
  )
}

export default RadioButtons