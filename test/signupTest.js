//Require the dev-dependencies

var chai = require('chai');
var chaiHttp = require('chai-http');
let should = chai.should();
let Users = require('../src/models/Users');
let assert = require('assert');
let token;

chai.use(chaiHttp);

describe('Sign Up', function() {
    var host = "http://localhost:3000";
    var path ;
    let signup = {email: 'testuser1@test.com', pass: 'password', first: 'James', last: 'Pearce'};

    after((done) =>{
        path = "/users/auth";
        chai
            .request(host)
            .post(path)
            .set('content-type', 'application/json')
            .send(signup)
            .end(function(error, response) {
                if (error) {
                    done(error);
                } else {
                    token = response.body.token;
                    assert( token !== undefined);
                    path = "/users/delete/"+signup.email;
                    chai
                        .request(host)
                        .delete(path)
                        .set({'Authorization': token})
                        .set('content-type', 'application/json')
                        .end(function(error, response) {
                            done();
                        });
                }
            });


    });




    it('should send parameters to : /users POST', function(done) {
        path = "/users";
        chai
            .request(host)
            .post(path)
            .set('content-type', 'application/json')
            .send(signup)
            .end(function(error, response) {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
    });

    it('should log the user in and receive a token : /users/auth', function (done) {
        path = "/users/auth";
        chai
            .request(host)
            .post(path)
            .set('content-type', 'application/json')
            .send(signup)
            .end(function(error, response) {
                if (error) {
                    done(error);
                } else {
                    token = response.body.token;
                    assert( token !== undefined);
                    done();
                }
            });

    });
});
