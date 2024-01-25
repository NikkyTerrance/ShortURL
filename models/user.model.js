const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
    passwordHash:{type: String, required: true}
    
});

// const user = mongoose.model("user")
module.exports = mongoose.model('user', userSchema)