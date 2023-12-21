const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your first name'],
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    linkedin: {type: String},
    github: {type: String},
    profilpicture: {type: String},
    cv: {type: String},
});

module.exports = userSchema;