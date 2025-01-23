const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

const registerUser = async (req, res) => {
    try {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(200).json({ msg: err.array() });
        }
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(200).json({ msg: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ user })
    }
    catch (err) {
        res.status(400).json({ err: err.message, success: false })
    }
}
module.exports = registerUser;