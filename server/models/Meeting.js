const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, // Format YYYY-MM-DD
    time: {
        type: String, // Assuming you want to store time as a string
        required: true
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    }
});

module.exports = mongoose.model('Meeting', MeetingSchema);
