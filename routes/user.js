const express = require('express');
const router = express.Router();

const {helloUser} = require('../controllers/user')

router.get('/', helloUser)

module.exports = router;