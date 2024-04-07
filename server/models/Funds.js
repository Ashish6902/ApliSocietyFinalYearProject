const mongoose = require('mongoose');
const { Schema } = mongoose;

const fundsSchema = new Schema({
    information:{
        type:String,
        required :true
    },
    date : {
        type: Date,
        required:true,
    },
    amount:{
        type: Number,
        required : true,
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    }
});

module.exports = mongoose.model('Funds' , fundsSchema);