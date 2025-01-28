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
        const token = generateToken(user._id);

        // get user Data With All Permissions
        const result = await User.aggregate([
            {
                $match: { email: user.email }
            },
            {
                $lookup: {
                    from: 'userpermissions',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'permissions'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                    permissions: {
                        $cond: {
                            if: { $isArray: "$permissions" },
                            then: { $arrayElemAt: ["$permissions", 0] },
                            else: null
                        }
                    }
                    // password:0,
                    // __v:0,
                    // createdAt:0,
                    // updatedAt:0
                }
            },
            {
                $addFields: {
                    permissions:{
                        $mergeObjects: ["$permissions", {}],
                    }
                }
            }
        ])

        res.status(200).json({
            message: 'Login Successfully...',
            token,
            tokenType: "Bearer",
            user,
            result: result[0]
        });
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = loginUser