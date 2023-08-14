const { getUsersAll, getLogin, getUsersById, getUsersByEmail, postUsers, putUsers, deleteById } = require("../model/UsersModel")
const argon2 = require('argon2');
const { createToken } = require("../utils/jwt");
const cloudinary = require("cloudinary").v2


const UsersController = {
    getData: async (req, res, next) => {
        try {
            let dataUsers = await getUsersAll()
            console.log(dataUsers)

            res.status(200).json({ "status": 200, "message": "get data users success", data: dataUsers.rows })

        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    getDataLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body
            let login = await getLogin(email)
            if (login.rowCount) {
                const passwordUser = login.rows[0].password
                if (await argon2.verify(passwordUser, password)) {
                    const token = createToken({ email: email, id: login.rows[0].id });
                    return res.status(200).json({ "status": 200, "message": "Login Success!", token, data: login.rows[0] })
                } else {
                    return res.status(404).json({ "status": 404, "message": "wrong password !!!" })
                }
            } else {
                return res.status(404).json({ "status": 404, "message": "email is not registered!!!" })
            }
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

            if (!name || !email || !password) {
                return res.status(404).json({ "message": "input name email password required" });
            }
            let checkUserByEmail = await getUsersByEmail(email)
            if (checkUserByEmail.rowCount) {
                return res.status(404).json({ "message": "Email already registered, use other email!" });
            }
            const passwordHashed = await argon2.hash(password);
            let data = {
                name: name,
                email: email,
                password: passwordHashed
            }

            let result = await postUsers(data)
            console.log(result)

            return res.status(200).json({ "status": 200, "message": "register success" })
        } catch (err) {
            return res.status(404).json({ "status": 404, "message": err.message })
        }
    },

    putData: async (req, res, next) => {
        const image = req.file
        try {
            const id = req.user.id
            const { name, email, password } = req.body

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ "message": "id wrong" });
            }

            let dataUsersId = await getUsersById(parseInt(id))
            if (dataUsersId.rowCount === 0) {
                return res.status(404).json({ "status": 404, "message": "The data you tried to update is not found in the database" });
            }

            const passwordHashed = password ? await argon2.hash(password) : password

            const hasilImage = image ? await cloudinary.uploader.upload(image.path, {
                use_filename: true,
                folder: "file-upload",
            }) : { secure_url: '', public_id: '' };
            if (image && dataUsersId.rows[0].image_id) {
                await cloudinary.uploader.destroy(dataUsersId.rows[0].image_id)
            }

            let data = {
                name: name || dataUsersId.rows[0].name,
                email: email || dataUsersId.rows[0].email,
                password: passwordHashed || dataUsersId.rows[0].password,
                image: hasilImage.secure_url || dataUsersId.rows[0].image,
                image_id: hasilImage.public_id || dataUsersId.rows[0].image_id
            }

            let result = await putUsers(data, id)

            return res.status(200).json({ "status": 200, "message": "update data users success" })
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