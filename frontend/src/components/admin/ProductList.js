import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import load from '../images/loading.gif'
import MetaData from '../layout/MetaData'
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';


const ProductList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { error, products, loading } = useSelector(state => state.products)
  const { error: productDeleteError, isDeleted } = useSelector(state => state.product)
  // const { user } = useSelector((state) => state.user)

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Product ID',
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
      field: 'stock',
      headerName: 'Stock',
      minWidth: 150,
      flex: .3
    },
    {
      field: 'price',
      headerName: 'Price',
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
            <Link to={`/admin/product/${params.id}`}><FontAwesomeIcon icon={faPenToSquare} size='lg' className='eyeIcon' /></Link>
            <button className='adminDelBtn' onClick={() => handleDelete(params.id)}><FontAwesomeIcon icon={faTrash} size='lg' /></button>
          </Fragment>

        )
      }
    },
  ]

  const rows = []

  products && products.map(el => {
    return (
      rows.push({
        id: el._id,
        name: el.name,
        stock: el.stock,
        price: el.price,
      })
    )
  })

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (productDeleteError) {
      alert.error(productDeleteError)
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully!")
      navigate("/admin/products")
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
    dispatch(getAdminProduct())
  }, [dispatch, alert, error, productDeleteError, isDeleted, navigate])

  return (
    <Fragment>
      <MetaData title={`Product Details`} />
      <div className='dashboard'>
        <Sidebar />
        {
          loading ?
            (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <img src={load} alt='loading' />
              </div>
            ) : (
              <div className='adminProductsPage'>
                <h2>Product's Details</h2>
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

export default ProductList
