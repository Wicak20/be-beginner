const { getData, getDataById, postData, putData, deleteDataById } = require("../controller/RecipeController.js")
const { authenticateUser } = require('../middleware/auth.js')
const express = require('express')
const router = express.Router()

router.get('/', authenticateUser, getData)
router.get('/:id', authenticateUser, getDataById)
router.post('/', authenticateUser, postData)
router.put('/:id', authenticateUser, putData)
router.delete('/:id', authenticateUser, deleteDataById)


module.exports = router;