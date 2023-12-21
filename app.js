const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const PORT = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI || process.env.DB_URI
// const dbURI = process.env.MONGODB_URI 
// const dbURI = process.env.DB_URI
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobsRouter = require('./routes/jobsRoutes');
const downloadRouter = require('./routes/downloadsRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + '/uploads'));
// app.use('/uploads', express.static('uploads'));

// database connection
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
// app.post('*', checkUser);
// app.delete('*', checkUser);
app.get('/', (req, res) => {res.locals.user === null ? res.redirect('/login') : res.render('home')});
// app.get('/jobs', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes);
app.use(checkUser, jobsRouter);
app.use(checkUser, userRoutes);
app.use(checkUser, downloadRouter);
// app.get('/viewJobs', requireAuth, (req, res) => res.render('viewJobs'));

module.exports = app