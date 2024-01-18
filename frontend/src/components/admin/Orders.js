import React, { useEffect, Fragment } from 'react'
import './Orders.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, deleteOrder } from '../../actions/orderAction'
import { ordersAdmin } from '../../actions/orderAction'
import load from '../images/loading.gif'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'

const Order = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { orders, error, loading } = useSelector(state => state.orders)
  const { error: orderDeleteError, isDeleted } = useSelector(state => state.order)

  const handleDelete = (id) => {
    dispatch(deleteOrder(id))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 200,
      flex: .5
    },
    {
      field: 'qty',
      headerName: 'Item Quantity',
      minWidth: 150,
      flex: .3
    },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      minWidth: 150,
      flex: .3,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "orderStatus") === "Processing" ? "redColor" : "greenColor"
      }
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
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
            <Link to={`/admin/order/${params.id}`}><FontAwesomeIcon icon={faPenToSquare} size='lg' className='eyeIcon' /></Link>
            <button className='adminDelBtn' onClick={() => handleDelete(params.id)}><FontAwesomeIcon icon={faTrash} size='lg' /></button>
          </Fragment>

        )
      }
    },
  ]

  const rows = []

  orders && orders.map(el => {
    return (
      rows.push({
        id: el._id,
        qty: el.orderItems.length,
        orderStatus: el.orderStatus,
        totalPrice: el.totalPrice,
      })
    )
  })

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (orderDeleteError) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully!")
      navigate("/admin/orders")
      dispatch({ type: DELETE_ORDER_RESET })
    }

    dispatch(ordersAdmin())
  }, [error, dispatch, alert, isDeleted, navigate, orderDeleteError])
  return (
    <Fragment>
      <MetaData title={"Orders List"} />
      <div className='dashboard'>
        <Sidebar />
        {
          loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <img src={load} alt='loading' />
            </div>
          ) : (
            <div className='adminProductsPage'>
              <h2>Order's Details</h2>
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

export default Order
