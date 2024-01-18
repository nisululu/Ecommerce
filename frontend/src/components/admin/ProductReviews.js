import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import load from '../images/loading.gif'
import MetaData from '../layout/MetaData'
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstant';
import './ProductReviews.css'

const ProductReviews = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const [productId, setProductId] = useState("")

    const { error: deleteError, isDeleted } = useSelector(state => state.review)
    const { error, reviews, loading } = useSelector(state => state.productReviews)
    // const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Reviews Deleted Successfully!")
            dispatch(getAllReviews(productId))
            navigate("/admin/reviews")
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    const handleDelete = (id, productId) => {
        dispatch(deleteReviews(id, productId))
    }


    const columns = [
        {
            field: 'id',
            headerName: 'Review ID',
            minWidth: 200,
            flex: .5
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: .5
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 300,
            flex: 1
        },
        {
            field: 'rating',
            headerName: 'Rating',
            minWidth: 250,
            type: "number",
            flex: .5,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, "rating") <= 3 ? "redColor" : "greenColor"
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: .5,
            sortable: false,
            type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <button className='adminDelBtn' onClick={() => handleDelete(params.id, productId)}><FontAwesomeIcon icon={faTrash} size='lg' /></button>
                    </Fragment>

                )
            }
        },
    ]

    const rows = []

    reviews && reviews.map(el => {
        return (
            rows.push({
                id: el._id,
                rating: el.rating,
                comment: el.comment,
                name: el.name,
            })
        )
    })

    const handleProductReview = (e) => {
        e.preventDefault()
        dispatch(getAllReviews(productId))
    }

    return (
        <Fragment>
            <MetaData title={`All Reviews`} />
            <div className='dashboard'>
                <Sidebar />
                {
                    loading ?
                        (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                                <img src={load} alt='loading' />
                            </div>
                        ) : (
                            <div className='productReviewPage'>
                                <form
                                    className='updateProductReviewForm'
                                    encType='multipart/form-data'
                                    onSubmit={handleProductReview}
                                >
                                    <h2>Reviews</h2>
                                    <div>
                                        <FontAwesomeIcon className="updateProductIcon" icon={faStar} />
                                        <input
                                            type='text'
                                            required
                                            placeholder='Search'
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <input
                                        type='submit'
                                        value="Get Reviews"
                                        className='addProductBtn'
                                        disabled={productId === "" ? true : false}
                                    />
                                </form>
                                {
                                    reviews && reviews.length > 0 ? (
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            pageSizeOptions={10}
                                            disableRowSelectionOnClick
                                            autoHeight
                                            style={{ marginTop: "100px" }}
                                        />
                                    ) : (
                                        <h1 className='noReview'>No Reviews Found</h1>
                                    )
                                }

                            </div>
                        )
                }
            </div>
        </Fragment>
    )
}

export default ProductReviews
