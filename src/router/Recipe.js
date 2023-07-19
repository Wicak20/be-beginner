const { getData } = require("../controller/RecipeController.js")
const express = require('express')
const router = express.Router()

router.get('/', getData)



module.exports = router;