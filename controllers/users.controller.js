const { userModel } = require("../models/User");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const loginUser = async (req, res) => {

}

module.exports = { loginUser };