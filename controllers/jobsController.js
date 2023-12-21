const { ObjectId } = require("mongodb");
const Job = require("../models/ConfigJobs")
const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
    let errors = { email: ''};

    // incorrect email
    if (err.errors.emailContact.properties.message === 'Please enter a valid email') {
        errors.email = 'Please enter a valid email';
    }

    return errors;
}


module.exports.createJob = async (req, res) => {
    let i = res.locals.user._id
    
    console.log(i);

    let jobInfos = {
        jobTitle,
        website,
        nameContact,
        emailContact,
        phone,
        Address,
        origin,
        statusCompanie,
        comments
    } = req.body;

    jobInfos.id_user = i

    console.log(jobInfos);

    const job = await Job.create(jobInfos)
    .then(resultat => {
        console.log(resultat)
        res.status(201).json({resultat})
    })
    .catch(err => {
        // console.log(err.message);
        handleErrors(err)
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    })
}


module.exports.listJobs = async (req, res) => {
    console.log( res.locals.user._id);
    try {
        const id = res.locals.user._id
        console.log(id)
        const jobs = await Job.find({id_user: id});
        console.log(jobs)
        res.status(200).json(jobs);
        // res.render('home')
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve jobs" });
    }
}

module.exports.JobItem = async (req, res) => {
    const jobId = req.body._id; 
    try {
        const job = await Job.findById(jobId);
        res.status(200).json({job});
    } catch (err) {
        res.status(500).json({ error: "Job not found" });
    }
};

module.exports.updateJob = async (req, res) => {
    const jobId = req.body._id;
    const jobInfos = {
        jobTitle,
        website,
        nameContact,
        emailContact,
        phone,
        Address,
        origin,
        statusJob,
        comments
    } = req.body;
    try {
        const job = await Job.findByIdAndUpdate(jobId, jobInfos, { new: true });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ error: "Job not found" });
    }
}

module.exports.deleteJob = async (req, res) => {
    const jobId = req.body._id;
    try {
        const job = await Job.findByIdAndDelete(jobId);
        res.status(200).json({msg: "Job deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: "Job not found" });
    }
}