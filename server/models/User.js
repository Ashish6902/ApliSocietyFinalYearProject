const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone:{
        type: Number,
        required: true,
    },
    role:{
        type:String,
        required: true,
    },
    Address:{
        type:String,
        required:true
    },
    roomNo:{
        type:Number,
        required:true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
