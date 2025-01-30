const User = require('../models/userModel');
const RouterPermission = require('../models/routerPermissionModel')
const mongoose = require('mongoose');


const GetUserPermission = async (user_id) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(user_id)
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
        return user[0]
    }
    catch (error) {
        console.log(error.message);
    }
};

const GetRouterPermission = async (router_endpoint, role) => {
    try {
        const routepermission = await RouterPermission.findOne({
            router_endpoint,
            role
        }).populate('permission_id');
        return routepermission
    }
    catch (error) {
        console.log(error.message);
        return null
    }
}

module.exports = { GetUserPermission, GetRouterPermission }