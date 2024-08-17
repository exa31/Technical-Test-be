const Category = require('./model');
const dataDummy = require('./dataDummy');
const Products = require('../products/model');
const Orders = require('../orders/model');

const addCategories = async (req, res, next) => {
    try {
        const categories = await Category.insertMany(dataDummy);
        res.status(201).json({ categories, status: 201 });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const payload = req.body;
        const category = new Category(payload);
        const result = await category.save();
        res.status(201).json({ category: result, status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ categories, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const category = await Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await Products.deleteMany({ category: id });
        await Orders.deleteMany({ product: products._id });
        res.status(200).json({ category, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    addCategories,
    getCategory
}