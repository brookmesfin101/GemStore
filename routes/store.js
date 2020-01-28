const express = require('express');

const storeController = require('../controllers/storeController');

const router = express.Router();

router.get('/', storeController.getIndex);

router.get('/details/:gemId', storeController.getDetails);

router.post('/addToCart', storeController.postAddToCart);

router.get('/dashboard', storeController.getDashboard);

router.get('/cart', storeController.getCart);

router.post('/update-cart', storeController.postUpdateCart);

router.post('/post-order', storeController.postOrder);

router.get('/orders', storeController.getOrders);

router.get('/login', storeController.getLogin);

router.post('/login', storeController.postLogin);

router.post('/logout', storeController.postLogout);

router.get('/sign-up', storeController.getSignUp);

router.post('/sign-up', storeController.postSignUp);

module.exports = router;