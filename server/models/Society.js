const mongoose = require('mongoose');
const { Schema } = mongoose;

const SocietySchema = new Schema({
    SocietyName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Address : {
        type: String,
        required : true
    }, 
    Contact:{
        type:int,
        required :true
    },
    AdminName :{
        type: String,
        required :true
    },
    imageOfSociety : {
        type: String,
        required :true
    },
});

module.exports = mongoose.model('Society' , SocietySchema);