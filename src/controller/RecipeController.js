const { getRecipeAll } = require('../model/RecipeModel')

const RecipeController = {
    getData: async (req, res, next) => {
        try {
            let dataRecipe = await getRecipeAll()
            res.status(200).json({ "status": 200, "message": "get data recipe success", data: dataRecipe.rows })

        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },
}

module.exports = RecipeController