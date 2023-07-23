const jwt = require("jsonwebtoken");

const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "24h" });
};

const tokenValidation = (token) => jwt.verify(token, process.env.JWT_KEY);

module.exports = {
    createToken,
    tokenValidation,
};