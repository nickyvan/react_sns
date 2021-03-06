const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// Body parser middle ware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB config

const db = require('./config/keys').mongoURI;

//Connect to database

mongoose
	.connect(db)
	.then(() => console.log('Mongo Database connected'))
	.catch((err) => console.log(err));

// Passport Middleware

app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// app.get('/', (req, res) => res.send('Hello'));

//Use Route
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
