const express = require('express');
const router = express.Router();

const {helloAuth} = require('../controllers/auth')

router.get('/', helloAuth)

module.exports = router;