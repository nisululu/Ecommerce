import React, {Fragment, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
import MetaData from '../layout/MetaData'

const Search = () => {

    const navigate = useNavigate()
    
    const [keyword, setKeyword] = useState("")
    const handleSearchSubmit = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate("/products")
        }
    }

  return (
    <Fragment>
        <MetaData title="Search -- ECOMMERCE" />
        <form className='searchbox' onSubmit={handleSearchSubmit}>
            <input type='text' placeholder='search anything' onChange={(e)=> setKeyword(e.target.value)}  />
            <input type='submit' value="Search" />
        </form>
    </Fragment>
  )
}

export default Search
