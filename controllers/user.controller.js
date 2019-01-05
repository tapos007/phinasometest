const User = require('../models/user.model');
require('express-async-errors');
//Simple version, without validation or sanitation
exports.test = async function (req, res) {
    const users = await User.find();
    res.send(users);
    
};

exports.updateSocketId = async function (name,socketId) {
   const update = await  User.updateOne({name: name}, {
    avaiable: true, 
    socket_id: socketId
    });
    return "update successfully";
    
};