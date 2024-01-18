import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faList, faUser } from '@fortawesome/free-solid-svg-icons'
import { UPDATE_USER_RESET } from '../../constants/userConstant'

const UpdateUser = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    const { loading: userUpdateLoading, error: userUpdateError, isUpdated } = useSelector(state => state.adminUser)
    const { loading, error, user } = useSelector(state => state.userDetails)

    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(getUserDetails(id))
        } 
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (userUpdateError) {
            alert.error(userUpdateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("User Updated Successfully!")
            navigate("/admin/users")
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, error, userUpdateError, isUpdated, alert, id, navigate, user])

    const handleUserUpdate = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("role", role)

        dispatch(updateUser(id, myForm))
    }

    return (
        <Fragment>
            <MetaData title={`Update Product`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='updateProductContainer'>
                    <form
                        className='updateProductForm'
                        encType='multipart/form-data'
                        onSubmit={handleUserUpdate}
                    >
                        <h2>Update User</h2>
                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faUser} />
                            <input
                                type='text'
                                required
                                placeholder='User Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faEnvelope} />
                            <input
                                type='email'
                                required
                                placeholder='User Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faList} />
                            <select onChange={(e) => setRole(e.target.value)}
                                value={role}
                            >
                                <option value="">Choose Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <input
                            type='submit'
                            value="Update User"
                            className='addProductBtn'
                            disabled={userUpdateLoading ? true : false || role === "" ? true : false}
                        />
                    </form>
                </div>
            </div >
        </Fragment >
    )
}

export default UpdateUser
