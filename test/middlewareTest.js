//Require the dev-dependencies
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var chai = require('chai');
var chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Middleware Authentication', function() {
    var host = "http://localhost:3000"
    var path = "/users/auth";
    var token = '';
    loginModel = {email: 'james@test.com', pass: 'password'};

    beforeEach((done) => {// get a valid token before tests
        path = "/users/auth";
        chai
            .request(host)
            .post(path)
            .set('content-type', 'application/json')
            .send(loginModel)
            .end(function(error, response) {
                if (error) {
                    done(error);
                } else {
                    token = response.body.token;
                    done();
                }
            });
    });


    it('should fail to get activities without token : /activities/all', function(done) {
        path = "/activities/all";
        chai
            .request(host)
            .get(path)
            .set('content-type', 'application/json')
            .end(function(error, response) {
                response.status.should.equal(401);
                done();
            });
    });
    it('should get activities without token : /activities/all', function(done) {
        path = "/activities/all";
        chai
            .request(host)
            .get(path)
            .set({'Authorization': token})
            .set('content-type', 'application/json')
            .end(function(error, response) {
                response.status.should.equal(200);
                done();
            });
    });
});

