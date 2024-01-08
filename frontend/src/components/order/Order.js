import React, { useEffect, Fragment } from 'react'
import { clearErrors, myOrder } from '../../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData'
import load from '../images/loading.gif'
import { Link } from 'react-router-dom';
import './Order.css'

const Order = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { loading, orders, error } = useSelector((state) => state.myOrders)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(myOrder())
  }, [dispatch])

  const rows = []

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 300,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: .5,
      cellClassName: (params) => {
        console.log(params.api.getCellValue(params.id, "status"));
        return params.api.getCellValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
      }
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      minWidth: 150,
      flex: .3
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 250,
      flex: .5
    },
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 300, flex: 1,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>View Details</Link>
        )
      }
    }]

  orders && orders.map((el) => {
    return (
      rows.push({
        id: el._id,
        status: el.orderStatus,
        itemsQty: el.orderItems.length,
        amount: el.totalPrice,
        // products: el.orderItems.map((el)=>el.name)
      })
    )
  })

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
              <MetaData title={`${user && user.name}'s Orders`} />
              <div className='myOrdersPage'>
                <h2>{user && user.name}'s Orders</h2>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableRowSelectionOnClick
                  autoHeight
                  style={{ marginTop: "100px" }}
                />
              </div>
            </Fragment>
          )
      }
    </Fragment>
  )
}

export default Order
