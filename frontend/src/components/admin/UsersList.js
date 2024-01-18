import React, { useEffect, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import load from '../images/loading.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { DELETE_USER_RESET } from '../../constants/userConstant'

const UsersList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { users, loading, error } = useSelector(state => state.allUsers)
  const { error: deleteUserError, isDeleted } = useSelector(state => state.adminUser)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteUserError) {
      alert.error(deleteUserError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully!")
      navigate("/admin/users")
      dispatch({ type: DELETE_USER_RESET })
    }

    dispatch(getAllUsers())
  }, [dispatch, alert, error, isDeleted, deleteUserError, navigate])

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'User ID',
      minWidth: 200,
      flex: .5
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 300,
      flex: 1
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: .3
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 250,
      flex: .5
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: .3,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}><FontAwesomeIcon icon={faPenToSquare} size='lg' className='eyeIcon' /></Link>
            <button className='adminDelBtn' onClick={() => handleDelete(params.id)}><FontAwesomeIcon icon={faTrash} size='lg' /></button>
          </Fragment>

        )
      }
    },
  ]

  const rows = []

  users && users.map(el => {
    return (
      rows.push({
        id: el._id,
        name: el.name,
        role: el.role,
        email: el.email,
      })
    )
  })
  return (
    <Fragment>
      <MetaData title={"User's List"} />
      <div className='dashboard'>
        <Sidebar />
        {
          loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <img src={load} alt='loading' />
            </div>
          ) : (
            <div className='adminProductsPage'>
              <h2>User's Details</h2>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={10}
                disableRowSelectionOnClick
                autoHeight
                style={{ marginTop: "100px" }}
              />
            </div>
          )
        }
      </div>
    </Fragment>
  )
}

export default UsersList
