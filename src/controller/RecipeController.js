const { getRecipeAll, getRecipeAllCount, getRecipeById, postRecipe, putRecipe, deleteById } = require('../model/RecipeModel');
const { search, use } = require('../router/Recipe');

const RecipeController = {
    getData: async (req, res, next) => {
        try {
            let { searchRecipe, searchBy, sortBy, sort, page, limit } = req.query

            let currentPage = page || 1;
            let pageLimit = limit || 5;
            const parameter = {
                searchRecipe: searchRecipe || "",
                searchBy: searchBy || 'title',
                sortBy: sortBy || 'created_at',
                sort: sort || 'ASC',
                offset: (currentPage - 1) * pageLimit,
                limit: pageLimit
            };
            let dataRecipe = await getRecipeAll(parameter)
            let dataRecipeCount = await getRecipeAllCount(parameter)

            let pagination = {
                totalPage: Math.ceil(dataRecipeCount.rowCount / pageLimit),
                totalData: parseInt(dataRecipeCount.rowCount),
                pageNow: parseInt(currentPage)
            };
            res.status(200).json({ "status": 200, "message": "get data recipe success", data: dataRecipe.rows, pagination })

        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let dataRecipeId = await getRecipeById(parseInt(id))

            if (!dataRecipeId.rows[0]) {
                return res.status(200).json({ "status": 200, "message": "get data recipe not found", data: [] })
            }

            return res.status(200).json({ "status": 200, "message": "get data recipe success", data: dataRecipeId.rows[0] })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    postData: async (req, res, next) => {

        try {
            const { title, ingredients, category_id } = req.body
            const current_user_id = req.user.id
            console.log("post data")
            console.log(title, ingredients, category_id)

            if (!title || !ingredients) {
                return res.status(404).json({ "message": "input title ingredients  required" });
            }
            let data = {
                title: title,
                ingredients: ingredients,
                category_id: category_id,
                user_id: current_user_id
            }

            console.log("data")
            console.log(data)
            let result = await postRecipe(data)
            console.log(result)

            return res.status(200).json({ "status": 200, "message": "data recipe success", data })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    putData: async (req, res, next) => {
        try {
            const { id } = req.params
            const { title, ingredients, category_id } = req.body
            const current_user_id = req.user.id
            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let dataRecipeId = await getRecipeById(parseInt(id))
            if (dataRecipeId.rowCount === 0) {
                return res.status(404).json({ "status": 404, "message": "The data you tried to update is not found in the database" });
            }

            if (current_user_id !== dataRecipeId.rows[0].user_id) {
                return res.status(404).json({ "message": "recipe bukan milik anda" });
            }

            let data = {
                title: title || dataRecipeId.rows[0].title,
                ingredients: ingredients || dataRecipeId.rows[0].ingredients,
                category_id: parseInt(category_id) || dataRecipeId.rows[0].category_id,
            }
            let result = await putRecipe(data, id)

            return res.status(200).json({ "status": 200, "message": "update data recipe success", data })
        } catch (err) {
            return res.status(404).json({ "status": 500, "message": err.message })

        }

    },

    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params
            const current_user_id = req.user.id

            let dataRecipeId = await getRecipeById(parseInt(id))
            if (dataRecipeId.rowCount === 0) {
                return res.status(404).json({ "status": 404, "message": "The data you tried to delete is not found in the database" });
            }
            if (current_user_id !== dataRecipeId.rows[0].user_id) {
                return res.status(404).json({ "message": "recipe bukan milik anda" });
            }

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let result = await deleteById(parseInt(id))
            console.log(result)
            if (result.rowCount == 0) {
                throw new Error("delete data failed")
            }
            return res.status(200).json({ "status": 200, "message": "delete data recipe success", data: result.rows[0] })

        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    }

}





module.exports = RecipeController