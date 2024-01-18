import React from 'react'
import './PageNotFound.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
    <FontAwesomeIcon className='orderCheck' icon={faExclamation} />
    <h3>Ops! Page not Found</h3>
    <Link to='/'>Return</Link>
    </div>
  )
}

export default PageNotFound
