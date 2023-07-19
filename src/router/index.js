const app = require("express")
const router = app.Router()
const Recipe = require("./Recipe")

router.use('/recipe', Recipe)


module.exports = router;