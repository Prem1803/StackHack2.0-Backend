const express = require('express');
const router = express.Router();

const {helloProduct} = require('../controllers/product')

router.get('/', helloProduct)

module.exports = router;