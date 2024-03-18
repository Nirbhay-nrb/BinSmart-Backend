const express = require('express');
const validateToken = require('../middleware/validate_token_handler');
const {registerUser, loginUser, getUser, changePassword} = require('../controllers/auth_controller');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', validateToken, getUser);

router.post('/changepassword', validateToken, changePassword);

module.exports = router;