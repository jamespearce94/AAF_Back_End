var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
import Users from '../models/Users'; // Import the User model so we can query the DB

let userController = {
    /**
     * @param req
     * @param res
     * post parameters from the request body to the user collection
     * hash the password using bcrypt
     */
    signupUser: (req, res) => {
        Users.findOne({emailAddress: req.body.email}, function (err, user) {
            if (user != null) {
                //document exists });
                res.statusCode = 409;
                res.statustext = 'Email already exists';
                res.json();
            }
            else {
                // var salt = bcrypt.genSaltSync(10);
                // var hash = bcrypt.hashSync(req.body.pass, salt);
                bcrypt.hash(req.body.pass, null, null, function (err, hash) {
                    // Store hash in your password DB.


                    Users.create({
                        emailAddress: req.body.email,
                        password: hash,
                        firstName: req.body.first,
                        lastName: req.body.last,
                        bio: '',
                        done: false
                    }, (err, users) => {
                        if (err) {
                            return res.send(err);
                        }
                        Users.findOne({emailAddress: req.body.email}, (err, users) => {
                            if (err) {
                                return res.send(err);
                            }
                            // Send User after new one has been created and saved
                            res.json(users);
                        });
                    });
                });
            }
        });
    },
    /**
     * @param req
     * @param res
     * compared the hashed passwords and send back the user and token if valid
     */
    loginUser: (req, res) => {
        Users.findOne({emailAddress: req.body.email}, (err, user) => {
            if (user == null) {
                res.statusCode = 404;
                res.statustext = 'Account not found';
                res.send({err: res.statusText}, 404);

            }
            else {
                if (user.password != null) {
                    bcrypt.compare(req.body.pass, user.password, function (err, valid) {// res == true
                        let localUser = user.toObject();
                        if (err) {
                            res.statusCode = 500;
                            res.statusText = 'Decryption error';
                            res.json();
                        }
                        if (valid) {
                            var token = jwt.sign({
                                data: localUser
                            }, 'cyclingActivities', {expiresIn: '1h'});
                            delete localUser.password;
                            localUser.token = token;
                            localUser.authenticated = true;
                            res.json(localUser);
                        }
                        else {
                            res.statusCode = 409;
                            res.statusText = "Invalid password";
                            res.json();
                        }


                    });
                }

            }
        });


    },
    /**
     * @param req
     * @param res
     * update the bio for the requested user with the request body parameter
     */
    updateBio: (req, res) => {
        Users.findOne({_id: req.params.id}, (err, user) => {
            if (user == null) {
                res.statusCode = 404;
                res.statustext = 'Account not found';
                res.json();

            }
            else {
                user.bio = req.body.bio;
                user.save((updateError, doc) => {
                    res.json(doc);
                })


            }
        });


    },
    /**
     * @param req
     * @param res
     * delete the selected user from the database
     */
    deleteUser: (req, res) => {
        Users.remove({
            emailAddress: req.params.email
        }, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send(result);
        });
    },
}
export default userController;