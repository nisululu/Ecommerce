import React, {Fragment} from 'react'
import './Aboutus.css'
import MetaData from '../MetaData'

const Aboutus = () => {
    return (
        <Fragment>
            <MetaData title={`About Us`} />
            <div className='aboutUsPage'>
                <div>
                    <h1>About NISCHAL TANDUKAR</h1>
                    <p>BIM student seeking for an opportunity to start career as entry-level web developer. I strive to associate myself with an organization where I can utilize my skills and knowledge in the best possible manner, which further gives me an opportunity to grow my career journey while contributing to the development of the organization.</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Aboutus
