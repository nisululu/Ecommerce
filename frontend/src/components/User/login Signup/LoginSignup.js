import React, { Fragment, useState, useRef, useEffect } from 'react'
import './LoginSignup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCircleUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { Link, useLocation } from 'react-router-dom'
// import { emphasize } from '@mui/material'
import profile from '../../images/profile.png'
import { login, signup } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors } from '../../../actions/productAction'
import load from '../../images/loading.gif'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const location = useLocation()

    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    const loginTab = useRef(null)
    const signupTab = useRef(null)
    const switcherTab = useRef(null)

    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: ""
    })
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState(profile)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [view, setView] = useState(false)

    const { name, email, password } = userData

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNetural")
            switcherTab.current.classList.remove("shiftToRight")

            signupTab.current.classList.remove("shiftToNeturalForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if (tab === "register") {
            switcherTab.current.classList.remove("shiftToNetural")
            switcherTab.current.classList.add("shiftToRight")

            signupTab.current.classList.add("shiftToNeturalForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/profile"//link for profile or cart 

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [dispatch, navigate, error, alert, isAuthenticated, redirect])

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)

        dispatch(signup(myForm))
    }

    const registerChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            {
                loading ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <img src={load} alt='loading' />
                    </div>
                    :
                    <Fragment>
                        <div className='login-container'>
                            <div className='login-box'>
                                <div>
                                    <div className='login-toggle'>
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>

                                <form className='login-form' ref={loginTab} onSubmit={handleLogin}>
                                    <div className='login-email'>
                                        <FontAwesomeIcon className='login-icon' icon={faEnvelope} />
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='login-password'>
                                        <FontAwesomeIcon className='login-icon' icon={faLock} />
                                        <input
                                            type={view ? "text" : "password"}
                                            placeholder='password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                        <FontAwesomeIcon className='updatepassword-icon2' icon={view ? faEye : faEyeSlash} onClick={() => setView(!view)} />
                                    </div>
                                    <Link to="/" >Forget Password ?</Link>
                                    <input type='submit' value="Login" className='login-btn' />
                                </form>

                                <form
                                    className='signup-form'
                                    ref={signupTab}
                                    encType='multipart/form-data'
                                    onSubmit={handleRegister}
                                >
                                    <div className='signup-name'>
                                        <FontAwesomeIcon className='login-icon' icon={faCircleUser} />
                                        <input
                                            type='text'
                                            placeholder='Username'
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerChange}
                                        />
                                    </div>
                                    <div className='signup-email'>
                                        <FontAwesomeIcon className='login-icon' icon={faEnvelope} />
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={registerChange}
                                        />
                                    </div>
                                    <div className='signup-password'>
                                        <FontAwesomeIcon className='login-icon' icon={faLock} />
                                        <input
                                            type={view ? "text" : "password"}
                                            placeholder='Password'
                                            required
                                            name='password'
                                            value={password}
                                            onChange={registerChange}
                                        />
                                        <FontAwesomeIcon className='updatepassword-icon2' icon={view ? faEye : faEyeSlash} onClick={() => setView(!view)} />
                                    </div>
                                    <div id='signup-image'>
                                        <img src={avatarPreview} alt='profile' className='login-icon' />
                                        <input
                                            type='file'
                                            name='avatar'
                                            accept='image/*'
                                            onChange={registerChange}
                                        />
                                    </div>
                                    <input
                                        type='submit'
                                        value='Register'
                                        className='signup-btn'
                                    // disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignup
