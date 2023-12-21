const User = require('../models/User');
const Job = require('../models/ConfigJobs');
// const authController = require('./authController');
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const cloudinary = require('cloudinary').v2;
// const cld = require('../middleware/cloudinaryConfig');
// const fs = require('fs');

module.exports.userProfile = (req, res) => {
    console.log(res.locals.user);
    const user = res.locals.user;
    
    res.status(200).json(user)
}

module.exports.downloadImage_get = (req, res) => {
    res.render('download')
}

module.exports.downloadImage = async (req, res, next) => {
//     const file = req.file;
//     console.log(file);
//     cloudinary.uploader
//     .upload('./uploads/'+file.filename)
//     .then(restImg=>{
//         console.log(restImg.url);
//         const doc = User.findByIdAndUpdate({_id: res.locals.user._id}, {profilpicture: restImg.url})
//         .then(result=>{
//             console.log(result)
//             if(result){
//                 fs.unlink('./uploads/'+file.filename, (err)=>{
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log("File deleted successfully");
//                     }
//                 })
//                 res.status(200).redirect('/user-profile');
//             }
//         })
//         .catch(err=>console.log(err));
//         console.log(User.findById(res.locals.user._id));
// })
//     .catch(err => console.log(err));
}

module.exports.updateUserProfile = async (req, res, next) => {
    console.log(req.body);
    
    try {
        let userInfos = {
            firstname,
            lastname,
            email,
            password,
            linkedin,
            github,
            profilpicture,
            cv,
        } = req.body;

        // console.log(userInfos.password.length);

        userInfos.password.length >= 6 ? 
        userInfos.password = await bcrypt.hash(userInfos.password, 10) : 
        userInfos.password = await User.findById(res.locals.user._id).password;

        const user = await User.findByIdAndUpdate(res.locals.user._id, userInfos);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User update' });
        }
        // next();

    } catch (err) {
        console.log(err);
    }
}

module.exports.deleteUserProfile = async (req, res) => {
    try {
        const id = await res.locals.user._id;

        // Delete the jobs associated with the user
        const jobsDeleted = await Job.deleteMany({ id_user: id });

        // Delete the user
        const user = await User.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            res.cookie('jwt', '', { maxAge: 1 });
            // res.clearCookie('jwt')
            res.status(200).json({ message: 'User and associated jobs deleted successfully' })
        }).catch(err => console.log(err));

        // if (!user && jobsDeleted.deletedCount === 0) {
        //     return res.redirect('/login').status(404).json({ message: 'User and jobs not found' });
        // }

        // if (!user) {
        //     return res.redirect('/login').status(404).json({ message: 'User not found, but jobs deleted successfully' });
        // }

        // if (jobsDeleted.deletedCount === 0) {
        //     return res.redirect('/login').status(404).json({ message: 'Jobs not found, but user deleted successfully' });
        // }

        // return res.redirect('/login').status(200).json({ message: 'User and associated jobs deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}