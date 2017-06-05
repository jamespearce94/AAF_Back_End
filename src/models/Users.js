let mongoose = require('mongoose');
// Create a schema for the User object
let usersSchema = new mongoose.Schema({
    emailAddress: String,
    password: String,
    firstName: String,
    lastName: String,
    bio: String
});
// Expose the model so that it can be imported and used in the controller
module.exports = mongoose.model('User', usersSchema);
