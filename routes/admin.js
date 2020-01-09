const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/dashboard-home', adminController.Dashboard_Home);

router.post('/dashboard-getadditem', adminController.Dashboard_GetAddItem);

router.post('/dashboard-catalog', adminController.Dashboard_Catalog);

router.post('/add-item', adminController.AddItem);

router.post('/edit-item', adminController.EditItem);

router.post('/update-item', adminController.UpdateItem);

module.exports = router;

