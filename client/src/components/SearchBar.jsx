import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountriesName } from '../actions'


function SearchBar() {
const dispatch = useDispatch()
const [input, setInput] = useState('')

const handleChange = (e) => {
setInput(e.target.value)
}

const handleSubmit = (e) => {  
    e.preventDefault();
    dispatch(getCountriesName(input))
    setInput('')
}


    return (
        <div className={'nav3'}>
            <form onSubmit={handleSubmit}>
            <button className={'button2'} type='submit' value='input'>Search</button> 
            
            <input className={'button9'} type="text" placeholder='Enter Country' onChange={handleChange}/>
            </form>
        </div>
    )
}

export default SearchBar
