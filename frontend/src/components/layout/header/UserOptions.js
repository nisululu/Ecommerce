import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket, faCartShopping, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindows } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
// import Backdrop from '@mui/material/Backdrop';
import profilepic from '../../images/profile.png'

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart)

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const profile = () => {
        navigate("/profile")
    }

    const orders = () => {
        navigate("/orders")
    }

    const cart = () => {
        navigate("/cart")
    }

    const logoutUser = () => {
        dispatch(logout())
        navigate("/")
        alert.success("Logout Successfully!!!")
    }

    const dashboard = () => {
        navigate("/dashboard")
    }

    const actions = [
        { icon: <FontAwesomeIcon icon={faCartShopping} />, name: 'Orders', func: orders },
        { icon: <FontAwesomeIcon icon={faCartPlus} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <FontAwesomeIcon icon={faUser} />, name: 'View Profile', func: profile },
        { icon: <FontAwesomeIcon icon={faRightFromBracket} />, name: 'Logout', func: logoutUser }
    ]

    if (user.role === "admin") {
        actions.unshift({ icon: <FontAwesomeIcon icon={faWindows} />, name: "Dashboard", func: dashboard })
    }

    return (
        <Fragment>
            {/* <Backdrop open={open} /> */}
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speed-dial'
                style={{ zIndex: '1' }}
                icon={
                    <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : profilepic} alt='Profile' />
                }
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
