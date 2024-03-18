const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoticeSchema = new Schema({
    title:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required :true
    },
    date : {
        type: Date,
        required:true
    },//format YYYY-MM--DD
    
});

module.exports = mongoose.model('Notice' , NoticeSchema);