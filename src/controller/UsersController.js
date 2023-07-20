const { getUsersAll, getUsersById, postUsers, putUsers, deleteById } = require("../model/UsersModel")

const UsersController = {
    getData: async (req, res, next) => {
        try {
            let dataUsers = await getUsersAll()
            res.status(200).json({ "status": 200, "message": "get data users success", data: dataUsers.rows })

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

            let dataUsersId = await getUsersById(parseInt(id))

            if (!dataUsersId.rows[0]) {
                return res.status(200).json({ "status": 200, "message": "get data users not found", data: [] })
            }

            return res.status(200).json({ "status": 200, "message": "get data users success", data: dataUsersId.rows[0] })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    postData: async (req, res, next) => {

        try {
            const { name, email, password } = req.body
            console.log("post data")
            console.log(name, email, password)

            if (!name || !email || !password) {
                return res.status(404).json({ "message": "input name email password required" });
            }
            let data = {
                name: name,
                email: email,
                password: password
            }

            console.log("data")
            console.log(data)
            let result = await postUsers(data)
            console.log(result)

            return res.status(200).json({ "status": 200, "message": "data users success", data })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    putData: async (req, res, next) => {
        try {
            const { id } = req.params
            const { email, password } = req.body

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let dataUsersId = await getUsersById(parseInt(id))
            if (dataUsersId.rowCount === 0) {
                return res.status(404).json({ "status": 404, "message": "The data you tried to update is not found in the database" });
            }
            let data = {
                email: email || dataUsersId.rows[0].email,
                password: password || dataUsersId.rows[0].password
            }

            let result = await putUsers(data, id)

            return res.status(200).json({ "status": 200, "message": "update data users success", data })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })

        }

    },

    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let result = await deleteById(parseInt(id))
            console.log(result)
            if (result.rowCount == 0) {
                throw new Error("delete data failed")
            }
            return res.status(200).json({ "status": 200, "message": "delete data users success", data: result.rows[0] })

        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    }
}


module.exports = UsersController

