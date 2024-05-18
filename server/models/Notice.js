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
    Noticeimage :{
        type:String,
        required:true
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    }
});

module.exports = mongoose.model('Notice' , NoticeSchema);