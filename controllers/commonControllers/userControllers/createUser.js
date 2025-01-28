const { validationResult } = require('express-validator');
const User = require('../../../models/userModel');
const Permission = require('../../../models/permissionModel');
const UserPermission = require('../../../models/userPermissionModel');

const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const sendMail = require('../../../helpers/sendMail')


const createUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { name, email } = req.body;

        const UserExist = await User.findOne({ email });
        if (UserExist) {
            return res.status(400).json({ message: "Email already exist" });
        }

        const password = randomString.generate(4);
        const hashedPassword = await bcrypt.hash(password, 10);

        var userObj = {
            name,
            email,
            password: hashedPassword
        }
        if (req.body.role && req.body.role === 1) {
            res.status(400).json({ message: "You Can't Create Admin" })
        } else if (req.body.role) {
            userObj.role = req.body.role
        }

        const user = await User.create(userObj);
        // Add Permission To User if Comming in Request
        if (req.body.permission != undefined && req.body.permission.length > 0) {
            const addPermission = req.body.permission;
            const permissionsArray = [];

            await Promise.all(addPermission.map(async (permission) => {
                const permissionData = await Permission.findOne({
                    _id: permission.id
                });
                if (!permissionData) {
                    return res.status(400).json({ message: "Permission Not Found" })
                }
                permissionsArray.push({
                    permission_name: permissionData.permission_name,
                    permission_value: permission.value
                })
            }));
            await UserPermission.create({
                user_id: user._id,
                permission: permissionsArray
            })
        }

        console.log(password);
        //  Content For Mail
        const content = `
         <p> Hii <b>${user.name}</b> Your Account Created SuccesFully, below is your details</p>
         <table>
         <tr>
            <th> Name :- </th>
            <td> ${user.name} </td>
         </tr>
         <tr>
            <th> Email :- </th>
            <td> ${user.email} </td>
         </tr>
         <tr>
            <td> Password :- </td>
            <td> <b> ${password} </b> </td>
         </table>
         <p> Now You can Login Your Account , Thanks For Registration....</p>
        `;
        //  Send Mail 
        sendMail(user.email, 'Account Created', content)

        res.status(201).json({ message: "User created successfully", user });

    } catch (err) {
        res.status(400).json({
            message: 'Error creating user',
            error: err.message
        })
    }
}
module.exports = createUser