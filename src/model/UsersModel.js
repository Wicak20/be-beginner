const Pool = require('../config/db')

const getUsersAll = async () => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users `, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const getUsersById = async (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const postUsers = async (data) => {
    const { name, email, password } = data
    console.log(data)
    console.log("model postData")
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users(name,email,password) VALUES('${name}','${email}','${password}')`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const putUsers = async (data, id) => {
    const { email, password } = data
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE users SET email='${email}',password='${password}' WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const deleteById = async (id) => {
    console.log("delete users by id ->", id)
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}



module.exports = { getUsersAll, getUsersById, postUsers, putUsers, deleteById }