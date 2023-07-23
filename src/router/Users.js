const { getData, getDataLogin, getDataById, postData, putData, deleteDataById } = require("../controller/UsersController")
const { authenticateUser } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

router.get('/', getData)
router.post('/login', getDataLogin)
router.get('/:id', getDataById)
router.post('/', postData)
router.put('/:id', authenticateUser, putData)
router.delete('/:id', authenticateUser, deleteDataById)

module.exports = router;
