const Pool = require('../config/db')

const getRecipeAll = async () => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, recipe.category FROM recipe`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

module.exports = { getRecipeAll }