const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
    Complaint:{
        type:String,
        required :true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isActive:{
        type: Boolean,
        required : true,
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    }
});

module.exports = mongoose.model('Complaints' , ComplaintSchema);