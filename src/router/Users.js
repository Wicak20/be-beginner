const { getData, getDataById, postData, putData, deleteDataById } = require("../controller/UsersController")
const express = require('express')
const router = express.Router()

router.get('/', getData)
router.get('/:id', getDataById)
router.post('/', postData)
router.put('/:id', putData)
router.delete('/:id', deleteDataById)

module.exports = router;
