const Pool = require('../config/db')

const getRecipeAll = async () => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, recipe.category_id FROM recipe`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const getRecipeById = async (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const postRecipe = async (data) => {
    const { title, ingredients, category_id } = data
    console.log(data)
    console.log("model postRecipe")
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe(title,ingredients,category_id,photo) VALUES('${title}','${ingredients}','${category_id}', 'https://placehold.co/600x400')`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const putRecipe = async (data, id) => {
    const { title, ingredients, category_id } = data
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE recipe SET title='${title}', ingredients='${ingredients}', category_id = ${category_id} WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const deleteById = async (id) => {
    console.log("delete recipe by id ->", id)
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM recipe WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}


module.exports = { getRecipeAll, getRecipeById, postRecipe, putRecipe, deleteById }