const express = require('express');
const categoryController = require('../controller/categoryController')
const { verify } = require('jsonwebtoken');
const { verifyjwt } = require('../utils/authmiddleware');

const router = express.Router();

router.post('/login', categoryController.loginController)
router.post('/register', categoryController.registerController)


router.post('/category', verifyjwt, categoryController.addCategory)
router.get('/categories', verifyjwt, categoryController.getCategory)
router.put('/category/:categoryId', verifyjwt, categoryController.updateCategory)
router.delete('/category/:categoryId', verifyjwt, categoryController.deleteCategory)


router.post('/category/:categoryId/service', verifyjwt, categoryController.addServices)
router.get('/category/:categoryId/service', verifyjwt, categoryController.getServices)
router.put('/category/:categoryId/service/:serviceId', verifyjwt, categoryController.updateServices)
router.delete('/category/:categoryId/service/:serviceId', verifyjwt, categoryController.deleteService)

module.exports = router ;


