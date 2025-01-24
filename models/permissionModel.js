const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
    permission_name :{
        type: String,
        required: true
    },
    is_default: {
        type: Number,
        default: 0 // 0 -> not Default , 1 -> Default
    }
},{
    timestamps: true
});
module.exports = mongoose.model('Permission', permissionSchema);