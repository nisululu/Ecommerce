import React, { useEffect, useState, Fragment } from 'react'
import load from '../../images/loading.gif'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faUnlockKeyhole, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import MetaData from '../../layout/MetaData'
import { clearErrors, updatePassword } from '../../../actions/userAction'
import './UpdatePassword.css'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfimPass] = useState("")
    const [view, setView] = useState(false)

    const updatePassswordChange = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("oldPass", oldPass)
        myForm.set("newPass", newPass)
        myForm.set("confirmPass", confirmPass)

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Password Changed Successfully!!!")

            navigate("/profile")

        }
    })

    return (
        <Fragment>
            {loading ?
                (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <img src={load} alt='loading' />
                    </div>
                ) : (
                    <Fragment>
                        <MetaData title={`Change Password`} />
                        <div className='updatepassword-container'>
                            <div className='updatepassword-box'>
                                <h3>Update Profile</h3>
                                <form
                                    className='updatepassword-form'
                                    onSubmit={updatePassswordChange}
                                >
                                    <div className='updatepassword-name'>
                                        <FontAwesomeIcon className='updatepassword-icon' icon={faUnlock} />
                                        <input
                                            type={view ? "text" : "password"}
                                            placeholder='Enter Old Password'
                                            required
                                            name="oldPass"
                                            value={oldPass}
                                            onChange={(e) => { setOldPass(e.target.value) }}
                                        />
                                        <FontAwesomeIcon className='updatepassword-icon2' icon={view ? faEye : faEyeSlash} onClick={() => setView(!view)} />
                                    </div>
                                    <div className='updatepassword-name'>
                                        <FontAwesomeIcon className='updatepassword-icon' icon={faLock} />
                                        <input
                                            type={view ? "text" : "password"}
                                            placeholder='Enter New Password'
                                            required
                                            name="newPass"
                                            value={newPass}
                                            onChange={(e) => { setNewPass(e.target.value) }}
                                        />
                                        <FontAwesomeIcon className='updatepassword-icon2' icon={view ? faEye : faEyeSlash} onClick={() => setView(!view)} />
                                    </div>
                                    <div className='updatepassword-name'>
                                        <FontAwesomeIcon className='updatepassword-icon' icon={faUnlockKeyhole} />
                                        <input
                                            type={view ? "text" : "password"}
                                            placeholder='Confirm Password'
                                            required
                                            name="confirmPass"
                                            value={confirmPass}
                                            onChange={(e) => { setConfimPass(e.target.value) }}
                                        />
                                        <FontAwesomeIcon className='updatepassword-icon2' icon={view ? faEye : faEyeSlash} onClick={() => setView(!view)} />
                                    </div>
                                    <input
                                        type='submit'
                                        value='Update'
                                        className='updatepassword-btn'
                                    // disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default UpdatePassword
