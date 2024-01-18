import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo.png'


const Header = () => {

  const [active, setActive ] = useState(false)

  const handleChange = () => {
    setActive(!active)
  }

  return (
    <nav>
      <div className='nav-main'>
        <div className='nav-logo'>
          <Link to="/"><img src={logo}/></Link>
        </div>

        <div className={active?'nav-list active':'nav-list'}>
          <FontAwesomeIcon icon={faXmark} className='close-btn' onClick={handleChange} />
          <ul>
            <li>
              <Link onClick={handleChange} className='link' to="/">
                <b>Home</b>
              </Link>
            </li>
            <li>
              <Link onClick={handleChange} className='link' to="/products">
              <b>product</b>
              </Link>
            </li>
            <li>
              <Link onClick={handleChange} className='link' to="/contact">
              <b>contact</b>
              </Link>
            </li>
            <li>
              <Link onClick={handleChange} className='link' to="/aboutus">
              <b>about us</b>
              </Link>
            </li>
          </ul>
        </div>

        <div className='nav-search'>
          <Link className='link' to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='searchbar' />
          </Link>

          <Link className='link' to="/login">
          <FontAwesomeIcon icon={faUser} className='login' />
          </Link>
      
          <FontAwesomeIcon icon={faBars} className='bars' onClick={handleChange} />
        </div>
      </div>
    </nav>
  )
}

export default Header
