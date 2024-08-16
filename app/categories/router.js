const express = require('express');
const router = express.Router();
const controllerCategory = require('./controller');

// add data dummy
router.get("/addcategories", controllerCategory.addCategories);

router.get('/categories/:id', controllerCategory.getCategory);
router.post('/categories', controllerCategory.createCategory);
router.get('/categories', controllerCategory.getCategories);
router.put('/categories/:id', controllerCategory.updateCategory);
router.delete('/categories/:id', controllerCategory.deleteCategory);

module.exports = router;