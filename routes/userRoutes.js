const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// router.get('/', (req, res) => {res.locals.user ? res.render('home', { jobs, origins: [], statusJobs: [], filterOrigin: req.query.filterOrigin, filterStatus: req.query.filterStatus }) : res.render('login')});
router.get('/user-profile', (req, res) => {res.locals.user ? res.render('userProfile', {update: false}) : res.render('login')});
router.get('/update-profile', (req, res) => {res.locals.user ? res.render('userProfile', {update: true}) : res.render('login')});
router.put('/update-profile', userController.updateUserProfile);
router.delete('/delete-profile', userController.deleteUserProfile)


module.exports = router;