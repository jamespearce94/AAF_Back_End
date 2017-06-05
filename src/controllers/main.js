import Activities from '../models/Activity'; // Import the Activity model so we can query the DB

let mainController = {
    /**
     * @param req
     * @param res
     * get all activities of a user
     */
    getUserActivities: (req, res) => {
        Activities.find({email: req.params.email}, (err, activities) => {
            if (err) {
                return res.send(err);
            }
            res.json(activities);
        });
    },
    /**
     * @param req
     * @param res
     * gets all activities of the current user and public activities
     */
    getAllActivities: (req, res) => {
        Activities.find({$or: [{email: req.user.emailAddress}, {shared: true}]}, (err, activities) => {
            if (err) {
                // Send the error to the client if there is one
                return res.send(err);
            }
            res.json(activities);
        });
    },
    /**
     * @param req
     * @param res
     * updates database kudo Array for the requested activity
     */
    postKudo: (req, res) => {
        Activities.update(
            {_id: req.params.id},
            {$push: {kudos: req.body.email}},
            (err, activities) => {
                if (err) {

                    return res.send(err);
                }
                else{
                    res.json(activities);
                }

            }
        )
    },
    /**
     *
     * @param req
     * @param res
     * update comment Array for the current activity
     */
    postComment: (req, res) => {
        Activities.update(
            {_id: req.params.id},
            {
                $push: {
                    comments: {
                        name: req.body.name,
                        email: req.body.email,
                        date: req.body.date,
                        comment: req.body.comment
                    }
                }
            },
            (err, activities) => {
                if (err, activities) {
                    return res.send(err);
                }
                res.json(activities);
            }
        )
    },
    /**
     * @param req
     * @param res
     * @param gpxTracks
     * @param activityDate
     * adds a new activity to the database
     */
    postNewActivity: (req, res, gpxTracks, activityDate) => {
        // This creates a new activities using POSTed data (in req.body)
        Activities.create({
            text: req.body.ActivityName,
            activityDate: activityDate,
            activityType: req.body.Type,
            email: req.body.Email,
            name: req.body.Name,
            kudos: [],
            shared: req.body.Shared,
            comments: [],
            trackPoints: gpxTracks,

            done: false
        }, (err, activities) => {
            if (err) {
                return res.send(err);
            }
            Activities.find({}, (err, activities) => {
                if (err) {
                    return res.send(err);
                }
                res.json(activities);
            });
        });
    },
    /**
     * @param req
     * @param res
     * deletes the requested activity from the database
     */
    deleteActivity: (req, res) => {
        Activities.remove({
            _id: req.params.id
        }, (err, activities) => {
            if (err) {
                return res.send(err);
            }
            Activities.find({}, (err, activities) => {
                if (err) {
                    return res.send(err);
                }
                res.json(activities);
            });
        });
    },
    /**
     * @param req
     * @param res
     * get requested activity
     */
    getActivity: (req, res) => {
        Activities.find({
            _id: req.params.id
        }, (err, activities) => {
            if (err) {
                return res.send(err);
            }
            res.json(activities);
        });
    },
}

export default mainController;
