import React, { Fragment, useState, useEffect } from 'react'
// import load from '../oldImages/loading.gif'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { categories } from '../product/categories'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faComments, faDollarSign, faDolly, faFile, faList, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import './UpdateProduct.css'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'

const UpdateProduct = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState()
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const { product, error } = useSelector(state => state.productDetails)
    const { error: updateError, isUpdated, loading } = useSelector(state => state.product)

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id))
        } else {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors)
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully!")
            navigate("/admin/products")
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, alert, error, updateError, navigate, isUpdated, id, product])

    const handleupdateProductSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("description", description)
        myForm.set("category", category)
        myForm.set("stock", stock)
        
        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(updateProduct(id, myForm))
    }

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([])
        setOldImages([])
        setImagesPreview([])

        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result])
                    setImages((prev) => [...prev, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
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
                        onSubmit={handleupdateProductSubmit}
                    >
                        <h2>Update Product</h2>
                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faDolly} />
                            <input
                                type='text'
                                required
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faDollarSign} />
                            <input
                                type='number'
                                required
                                placeholder='Product Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faNoteSticky} />
                            <textarea
                                required
                                placeholder='Product Descrption'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={1}
                                cols={30}
                            ></textarea>
                        </div>


                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faList} />
                            <select onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="">Choose category</option>
                                {
                                    categories.map(el => {
                                        return (
                                            <option key={el} value={el}>{el}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <FontAwesomeIcon className="updateProductIcon" icon={faBoxOpen} />
                            <input
                                type='number'
                                required
                                placeholder='Product Stock'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id='updateProductFormFile'>
                            <FontAwesomeIcon className="updateProductIcon" icon={faFile} />
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={updateProductImagesChange}
                            />
                        </div>

                        <div id='updateProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt='Product oldImages' />
                            ))}
                        </div>

                        <div id='updateProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Images' />
                            ))}
                        </div>
                        <input
                            type='submit'
                            value="Update Product"
                            className='addProductBtn'
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div >
        </Fragment >
    )
}

export default UpdateProduct
