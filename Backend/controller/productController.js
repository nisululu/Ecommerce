const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')

//Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

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
        .pagination(resultPerPage)

    let products = await apiFeature.query
    let filteredProductsCount = products.length

    // apiFeature.pagination(resultPerPage)

    // products = await apiFeature.query

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

    if (req.query.id.toString() === req.user.id.toString()) {
        const reviews = product.reviews.filter(el => el.user.toString() !== req.query.id.toString())

        let average = 0
        reviews.forEach(el => {
            average += el.rating
        })

        ratings = average / reviews.length || 0

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
    } else {
        return next(new ErrorHandler("Not Authorized to delete this review", 404))
    }


})