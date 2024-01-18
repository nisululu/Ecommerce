import React from 'react'
import './Footer.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import app from '../../images/app.svg'
import play from '../../images/play.svg'
// import visa from '../../images/visa.svg'
// import mastercard from '../../images/mastercard.svg'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer>
      <div className='footer-main'>
        <div className='footer-left'>
          <div className='contactus'>
            <h3 className="footerh3">CONTACT US</h3>
            <p> <strong>ADDRESS:</strong> Patan, Lalitpur</p>
            <p> <strong>PHONE:</strong> +977 9861552419</p>
            <p> <strong>OPEN HOURS:</strong> 9:00 AM - 10:00 PM, SUN - FRI</p>
          </div>
        </div>

        <div className='follow'>
          <h3 className="footerh3">FOLLOW US</h3>

          <ul>
            <li>
              <Link className='followus-link'>FACEBOOK</Link>
            </li>
            <li>
              <Link className='followus-link'
              >INSTAGRAM</Link>
            </li>
            <li>
              <Link className='followus-link'>YOUTUBE</Link>
            </li>
            <li>
              <Link className='followus-link'>LINKEDIN</Link>
            </li>
          </ul>
        </div>

        <div className='footer-mid'>
          <h3 className="footerh3">ABOUT US</h3>
          <ul>
            <li>
              <Link className='aboutus-link'>INTRODUCTION</Link>
            </li>
            <li>
              <Link className='aboutus-link'
              >DELIVERY INFO</Link>
            </li>
            <li>
              <Link className='aboutus-link'>PRIVACY POLICY</Link>
            </li>
            <li>
              <Link className='aboutus-link'>TERMS & CONDITIONS</Link>
            </li>
          </ul>
        </div>

        <div className='footer-right'>
          <h3 className="footerh3">GET OUR APPLICATION</h3>
          <p>From App Store or Google Play</p>

          <div className='store-svg'>
            <Link className='svg-link' to="https://www.apple.com/app-store/"><img src={app} alt='Apple Store' /></Link>
            <Link className='svg-link' to="https://play.google.com/store/games?hl=en_US&gl=US"><img src={play} alt='Google Playstore' /></Link>
          </div>
        </div>
      </div>
      <hr />
      <div className='copyright'>
        <p> © {date} All Rights Reserved. Designed and Maintained by NISCHAL TANDUKAR.</p>
      </div>
    </footer>
  )
}

export default Footer
