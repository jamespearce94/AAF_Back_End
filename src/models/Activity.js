let mongoose = require('mongoose');
// Create a schema for the Activity object
let activitiesSchema = new mongoose.Schema({
text: String,
  activityDate: Date,
    activityType: String,
    email: String,
    name: String,
    kudos: Array,
    shared: Boolean,
    comments:Array,
    trackPoints:Array
});
// Expose the model so that it can be imported and used in the controller
module.exports = mongoose.model('Activity', activitiesSchema);
