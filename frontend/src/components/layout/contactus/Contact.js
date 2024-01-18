import React, {Fragment} from 'react'
import MetaData from '../MetaData'
import { Link } from 'react-router-dom'
import './Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Contact = () => {
  return (
    <Fragment>
            <MetaData title={`Contact Us`} />
            <div className='contactPage'>
                <div>
                    <FontAwesomeIcon icon={faEnvelope}/><p>Email:</p>
                    <Link to="https://www.mailto:nischa@gmail.com">nischaltandukar0@gmail.com</Link>
                </div>
                <div>
                <FontAwesomeIcon icon={faLinkedin}/><p>LinkedIn:</p>
                    <Link to="https://www.linkedin.com/in/nisululu">linkedin.com/in/nisululu</Link>
                </div>

                <div>
                <FontAwesomeIcon icon={faGithub}/><p>GitHub:</p>
                    <Link to="https://github.com/nisululu">github.com/nisululu</Link>
                </div>
            </div>
    </Fragment>
  )
}

export default Contact
