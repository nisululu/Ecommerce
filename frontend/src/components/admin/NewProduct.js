import React, { Fragment, useState, useEffect } from 'react'
import './NewProduct.css'
import load from '../images/loading.gif'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { categories } from '../product/categories'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addProduct, clearErrors } from '../../actions/productAction'
import { useNavigate } from 'react-router-dom'
import { ADD_PRODUCT_RESET } from '../../constants/productConstant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faComments, faDollarSign, faDolly, faFile, faList, faNoteSticky } from '@fortawesome/free-solid-svg-icons'

const NewProduct = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState()
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Product added successfully!")
            navigate('/admin/dashboard')
            dispatch({ type: ADD_PRODUCT_RESET })
        }
    }, [dispatch, error, alert, success, navigate])

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([])
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

    const handleNewProductSubmit = (e) => {
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
        dispatch(addProduct(myForm))
    }
    return (
        <Fragment>
            <MetaData title={`Create Product`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form
                        className='newProductForm'
                        encType='multipart/form-data'
                        onSubmit={handleNewProductSubmit}
                    >
                        <h2>Add New Product</h2>
                        <div>
                            <FontAwesomeIcon className="newProductIcon" icon={faDolly} />
                            <input
                                type='text'
                                required
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="newProductIcon" icon={faDollarSign} />
                            <input
                                type='number'
                                required
                                placeholder='Product Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <FontAwesomeIcon className="newProductIcon" icon={faNoteSticky} />
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
                            <FontAwesomeIcon className="newProductIcon" icon={faList} />
                            <select onChange={(e) => setCategory(e.target.value)}>
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
                            <FontAwesomeIcon className="newProductIcon" icon={faBoxOpen} />
                            <input
                                type='number'
                                required
                                placeholder='Product Stock'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id='newProductFormFile'>
                            <FontAwesomeIcon className="newProductIcon" icon={faFile} />
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={createProductImagesChange}
                                required
                            />
                        </div>

                        <div id='newProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Images' />
                            ))}
                        </div>
                        <input
                            type='submit'
                            value="Add Product"
                            className='addProductBtn'
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            </div >
        </Fragment >
    )
}

export default NewProduct
