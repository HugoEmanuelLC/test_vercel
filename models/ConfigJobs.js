const mongoose = require('mongoose');
const { isEmail } = require('validator');

const jobSchema = new mongoose.Schema({
    id_user: { type: String },
    jobTitle: {
        type: String,
        required: [true, 'Please enter your first name'],
        lowercase: true
    },
    company: {
        type: String,
        required: [true, 'Please enter a name of the company'],
        lowercase: true
    },
    website: {
        type: String,
        required: [true, 'Please enter your last name'],
        lowercase: true
    },
    nameContact: {
        type: String,
        lowercase: true
    },
    emailContact: {
        type: String,
        required: false,
        lowercase: true,
        // validate: [isEmail, 'Please enter a valid email'],
    },
    phone: { type: String },
    Address: { type: String },

    origin: [{ type: String }],
    statusJob: [{ type: String }],
    comments: { type: String },
    date: { type: Date, default: Date.now }

});

const Job = mongoose.model('jobs', jobSchema);

module.exports = Job;