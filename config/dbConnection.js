const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/ROLR-PERMISSION').then(()=>{
    console.log("connect to database");
}).catch((err)=>{
    console.log(err.message);
});


module.exports = connect