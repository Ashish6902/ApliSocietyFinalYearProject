const mongoose = require('mongoose');
const { Schema } = mongoose;

const SocietySchema = new Schema({
    SocietyName:{
        type:String,
        required:true,
        unique: true
    },
    Address : {
        type: String,
        required : true
    }, 
    Contact:{
        type:Number,
        required :true
    },
    date : {
        type: Date,
        default : Date.now
    },
});

module.exports = mongoose.model('Society' , SocietySchema);