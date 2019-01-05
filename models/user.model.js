const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    socket_id:{type: String}, 
    avaiable:{type: Boolean, default: false},
});


// Export the model
module.exports = mongoose.model('User', ProductSchema);