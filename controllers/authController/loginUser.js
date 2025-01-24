const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const generateToken = require('../../utils/generateToken');

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email & Password Incorrect' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email & Password Incorrect' });
        }
        const token = generateToken(user._id)
        res.status(200).json({
            message: 'Login Successfully...',
            token,
            tokenType: "Bearer",
            user
        });
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = loginUser