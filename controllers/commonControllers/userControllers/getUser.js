const User = require('../../../models/userModel');
const mongoose = require('mongoose')
const getUser = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose.Types.ObjectId(req.user.id)
                    }
                }
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
                }
            },
            {
                $addFields: {
                    permissions: {
                        $mergeObjects: ["$permissions", {}],
                    }
                }
            }
        ]);
        res.status(200).json({ message: "User Fatched Successfully....", users });
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching user',
            error: error.message
        })
    }
}
module.exports = getUser