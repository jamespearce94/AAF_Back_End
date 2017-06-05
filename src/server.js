/**
 * Import dependencies
 */
import express from 'express';
import logger from 'morgan'; // Logs each server request to the console
import bodyParser from 'body-parser'; // Takes information from POST requests and puts it into an object
import methodOverride from 'method-override'; // Allows for PUT and DELETE methods to be used in browsers where they are not supported
import mongoose from 'mongoose'; // Wrapper for interacting with MongoDB
import path from 'path';

// require multer handle multipart data
let multer = require('multer');

// require fs to handle incoming files
let fs = require('fs');

// require gpxParse to handle gpx data for the database
let gpxParse = require('gpx-parse');


// require cors to allow requests from other ip addresses
let cors = require('cors')
    , app = express();

// require jwt to handle creating and verifying tokens
let jwt = require('jsonwebtoken');

// jwt secret
let secret = "cyclingActivities";

// path for gpx uploads
let DIR = './uploads/';
let storage = multer.diskStorage({
    destination: DIR,
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = multer({
    storage: storage,
    dest: DIR
});


import mainController from './controllers/main';
import userController from './controllers/users';


/**
 * Configure database
 */
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/FitGainsDB'); // Connects to your MongoDB.  Make sure mongod is running!
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Configure server
 */
app.set('port', process.env.PORT || 3000); // Set port to 3000 or the provided PORT letiable
app.use(express.static(path.join(__dirname, '..', 'public'))); // Set the static files directory - /public will be / on the frontend
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON data and put it into an object which we can access
app.use(methodOverride()); // Allow PUT/DELETE
app.use(cors());

/**
 * Configure routes
 */
app.post('/api', upload.any(), function (req, res, next) {
    // req.body contains the text fields
    gpxParse.parseGpxFromFile('./uploads/' + req.files[0].filename, function (error, data) {
        if (error) {
            console.log(error);
            res.statusCode = 500;
            res.send();
        }
        else {
            let tracks = data.tracks[0].segments[0];
            let activityDate = new Date();
            mainController.postNewActivity(req, res, tracks, activityDate);
            fs.unlink('./uploads/' + req.files[0].filename, (err) => {
                if (err) throw err;
            });
        }


    });

})
// No token required
app.post('/users', userController.signupUser);
app.post('/users/auth', userController.loginUser);
/**
 * Middleware
 */
app.use(function (req, res, next) {
    let token = req.header('Authorization');
    // invalid token - synchronous

    try {
        var decoded = jwt.verify(token, secret);
    } catch (err) {
        // err
        console.log('error');
    }
    if ((!token || !decoded)) {
        res.statusCode = 401;
        res.send();
    }
    else {
        req.user = decoded.data;
        next()
    }
});
// Token required
app.delete('/users/delete/:email', userController.deleteUser);
app.post('/activities', mainController.postNewActivity);
app.get('/activities/user/:email', mainController.getUserActivities);
app.put('/user/update/:id', userController.updateBio);
app.get('/activities/all', mainController.getAllActivities);
app.get('/activities/details/:id', mainController.getActivity);
app.delete('/activities/delete/:id', mainController.deleteActivity);
app.post('/activities/kudos/:id', mainController.postKudo);
app.post('/activities/comment/:id', mainController.postComment);


/**
 * Start app
 */
app.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}!`);
});
