import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Country, State } from 'country-state-city'
import './Shipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faBuilding, faEarthAmericas, faCode, faPhone, faChessQueen, faChess } from '@fortawesome/free-solid-svg-icons'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { shippingInfo } = useSelector((state) => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits")
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
        navigate("/order/confirm")
    }

    return (
        <Fragment>
            <MetaData title="Shipping Details"/>

            <CheckoutSteps activeStep={0} />            
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2>Shipping Details</h2>

                    <form className='shippingForm' encType='multipart/form-data' onSubmit={handleSubmit}>
                        <div>
                            <FontAwesomeIcon className='fontAwesome' icon={faLocationDot} />
                            <input
                                type='text'
                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className='fontAwesome' icon={faBuilding} />
                            <input
                                type='text'
                                placeholder='City'
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        {/* <div>
                            <input
                                type='text'
                                placeholder='State'
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div> */}

                        <div>
                            <FontAwesomeIcon className='fontAwesome' icon={faCode} />
                            <input
                                type='number'
                                placeholder='Pin Code'
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className='fontAwesome' icon={faPhone} />
                            <input
                                type='number'
                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className='fontAwesome' icon={faEarthAmericas} />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {
                                    Country && Country.getAllCountries().map((el) => (
                                        <option key={el.isoCode} value={el.isoCode}>{el.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {
                            country && (
                                <div>
                                    <FontAwesomeIcon className='fontAwesome' icon={faChessQueen} />
                                    <select
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((el) => (
                                                <option key={el.isoCode} value={el.isoCode}>{el.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )}

                        <input
                            type='submit'
                            value="Continue"
                            className='shippingBtn'
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
