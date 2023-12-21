const { Router } = require('express');

const jobsController = require('../controllers/jobsController')

const router = Router();

router.get('/create-job', (req, res) => {res.locals.user ? res.render('createJob') : res.redirect('/login')})
router.post('/create-job', jobsController.createJob)
// router.get('/create-job', (req, res) => res.render('createJob'))
router.get('/list-jobs', jobsController.listJobs)
router.post('/detail-job', jobsController.JobItem)
// router.get('/job/:id', (req, res) => res.render('home'))
router.put('/job', jobsController.updateJob)
router.delete('/job', jobsController.deleteJob)

module.exports = router;