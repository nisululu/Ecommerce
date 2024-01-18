const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

//Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === "string") { //if it is simply string push to images and if it is array of images then simply images = req.body.images
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLink = []

    for (let i = 0; i < images.length; i++) {
        const myCloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        })

        imagesLink.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        })
    }
    req.body.images = imagesLink
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

//Get All Products
exports.getProduct = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query
    let filteredProductsCount = products.length

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query.clone()

    if (!products) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
})

//Get all Products -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()

    if (!products) {
        return next(new ErrorHandler("Products not found", 404))
    }

    res.status(200).json({
        success: true,
        products
    })
})

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//Update Products -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    //Update Image in Cloudinary
    let images = []
    if (typeof req.body.images === "string") { //if it is simply string push to images and if it is array of images then simply images = req.body.images
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        //Deleting images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        const imagesLink = []

        for (let i = 0; i < images.length; i++) {
            const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            })

            imagesLink.push({
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            })
        }
        req.body.images = imagesLink
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    //Delete products images form Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: "Product successfully deleted."
    })
}

//Create new Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productID } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productID)

    const isReviewed = product.reviews.find((el) => el.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(el => {
            if (el.user.toString() === req.user._id.toString()) {
                console.log(el.user.toString());
                el.rating = rating,
                    el.comment = comment
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let average = 0
    product.reviews.forEach(el => {
        average += el.rating
    })

    product.ratings = average / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

//Get Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productID)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(el => el._id.toString() !== req.query.id.toString())

    let average = 0
    reviews.forEach(el => {
        average += el.rating
    })

    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = average / reviews.length
    }

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productID, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Product review deleted successfully"
    })



})