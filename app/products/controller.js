const Products = require('./model');
const dataDummy = require('./dataDummy');
const Categories = require('../categories/model');

const addProducts = async (req, res, next) => {
    try {
        const products = await Products.insertMany(dataDummy);
        res.status(201).json({ products, status: 201 });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const payload = req.body;
        console.log(payload);
        const category = await Categories.findOne({ name: payload.category });
        if (!category) {
            return res.status(400).json({ message: 'Category not found, create your category first' });
        }
        payload.category = category._id;
        const product = new Products(payload);
        const result = await product.save();
        res.status(201).json({ product: result, status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message, error: error });
        } else {
            next(error);
        }

    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Products.find().populate('category');
        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ products, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }

    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }

    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        if (payload.category) {
            const category = await Categories.findOne({ name: payload.category });
            if (!category) {
                return res.status(400).json({ message: 'Category not found, create your category first' });
            }
            payload.category = category._id;
        }
        const product = await Products.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Products.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    addProducts
}