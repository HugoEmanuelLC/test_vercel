const cloudinary = require('cloudinary').v2;

// CLOUDINARY
const cld = cloudinary.config({
        cloud_name: 'dsvfaoan6',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
});

module.exports = cld;