const Order = require('./model');
const dataDummy = require('./dataDummy');

const addOrder = async (req, res, next) => {
    try {
        const order = await Order.insertMany(dataDummy);
        res.status(201).json({ order, status: 201 });
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const payload = req.body;
        const order = new Order(payload);
        const result = await order.save();
        res.status(201).json({ order: result, status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('product').populate('user');
        res.status(200).json({ orders, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('product').populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const order = await Order.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        res.status(200).json({ order, status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    addOrder
}