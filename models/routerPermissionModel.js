const mongoose = require('mongoose');


const routerPermissionSchema = new mongoose.Schema({
    router_endpoint: {
        type: String,
        required: true
    },
    role: {
        type: Number, //0,1,2,3
        required: true
    },
    permission: {
        type: Array, //0,1,2,3
        required: true
    } 
});

module.exports = mongoose.model('RouterPermission', routerPermissionSchema)