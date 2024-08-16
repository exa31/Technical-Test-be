const express = require('express');
const router = express.Router();
const controllerOrder = require('./controller');

router.post('/orders', controllerOrder.createOrder);
router.get('/orders', controllerOrder.getOrders);
router.get('/orders/:id', controllerOrder.getOrder);
router.put('/orders/:id', controllerOrder.updateOrder);
router.delete('/orders/:id', controllerOrder.deleteOrder);
router.get('/addorders', controllerOrder.addOrder);

module.exports = router;