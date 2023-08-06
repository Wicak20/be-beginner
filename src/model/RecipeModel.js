const Pool = require('../config/db')

const getRecipeAll = async ({ searchRecipe, searchBy, sortBy, sort, offset, limit }) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, category.category_name AS category, recipe.user_id FROM recipe JOIN category ON recipe.category_id = category.category_id  WHERE ${searchBy} ILIKE '%${searchRecipe}%' ORDER BY ${sortBy} ${sort} OFFSET ${offset} LIMIT ${limit}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const getRecipeAllCount = async () => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe `, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const getRecipeAllByUserId = async ({ userid, offset, limit }) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, category.category_name AS category, recipe.user_id FROM recipe JOIN category ON recipe.category_id = category.category_id  WHERE recipe.user_id='${userid}' OFFSET ${offset} LIMIT ${limit}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const getRecipeAllByUserIdCount = async ({ userid }) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe where user_id = '${userid}'`, (err, result) => {
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
        Pool.query(`SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, recipe.image_id, recipe.user_id, recipe.category_id, category.category_name AS category FROM recipe JOIN category ON recipe.category_id = category.category_id WHERE id=${id} `, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const postRecipe = async (data) => {
    const { title, ingredients, category_id, user_id, image, image_id } = data
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe(title,ingredients,category_id,photo,image_id,user_id, created_at) VALUES('${title}','${ingredients}','${category_id}', '${image}','${image_id}', '${user_id}', CURRENT_TIMESTAMP )`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const putRecipe = async (data, id) => {
    const { title, ingredients, category_id, photo, image_id } = data
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE recipe SET title='${title}', ingredients='${ingredients}', photo = '${photo}' , image_id = '${image_id}', category_id = '${category_id}' WHERE id=${id}`, (err, result) => {
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


module.exports = { getRecipeAll, getRecipeAllCount, getRecipeAllByUserId, getRecipeAllByUserIdCount, getRecipeById, postRecipe, putRecipe, deleteById }