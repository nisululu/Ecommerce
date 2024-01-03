import React, { useEffect, useState, Fragment } from 'react'
import './UpdateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import profile from '../../images/profile.png'
import { clearErrors, loadUser, updateProfilee } from '../../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import load from '../../images/loading.gif'

const UpdateProfile = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState(profile)

    const updateProfileChange = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)

        dispatch(updateProfilee(myForm))
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully!!!")
            dispatch(loadUser());

            navigate("/profile")

            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, error, alert, user, isUpdated, navigate])

    return (
        <Fragment>
            {
                loading ?
                    (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                            <img src={load} alt='loading' />
                        </div>
                    ) : (
                        <Fragment>
                            <div className='updateprofile-container'>
                                <div className='updateprofile-box'>
                                    <h3>Update Profile</h3>
                                    <form
                                        className='updateprofile-form'
                                        encType='multipart/form-data'
                                        onSubmit={updateProfileChange}
                                    >
                                        <div className='updateprofile-name'>
                                            <FontAwesomeIcon className='updateprofile-icon' icon={faCircleUser} />
                                            <input
                                                type='text'
                                                placeholder='Username'
                                                required
                                                name="name"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </div>
                                        <div className='signup-email'>
                                            <FontAwesomeIcon className='updateprofile-icon' icon={faEnvelope} />
                                            <input
                                                type='email'
                                                placeholder='Email'
                                                required
                                                name='email'
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                        </div>
                                        <div id='updateprofile-image'>
                                            <img src={avatarPreview} alt='profile' className='updateprofile-icon' />
                                            <input
                                                type='file'
                                                name='avatar'
                                                accept='image/*'
                                                onChange={updateProfileDataChange}
                                            />
                                        </div>
                                        <input
                                            type='submit'
                                            value='Update'
                                            className='updateprofile-btn'
                                        // disabled={loading ? true : false}
                                        />
                                    </form>
                                </div>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    )
}

export default UpdateProfile
