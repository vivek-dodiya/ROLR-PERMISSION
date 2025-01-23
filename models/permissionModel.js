const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    permission: [{
        permission_name : String, 
        permission_value : [Number] // 0 -> Create , 1 -> Reade , 2 -> Edit/ Update , 3 -> Delete
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Permission', permissionSchema);