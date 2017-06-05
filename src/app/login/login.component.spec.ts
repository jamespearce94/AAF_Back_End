import {LoginComponent} from './login.component';
import {TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {LoginRoutingModule} from "./login-routing.module";
import {CommonModule} from "@angular/common";
import {HttpModule, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeModule} from "../home/home.module";
import {HomeRoutingModule} from "../home/home-routing.module";


describe('LoginComponent', function () {
    let signup;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, LoginRoutingModule, HomeModule, HomeRoutingModule, FormsModule, SimpleNotificationsModule, HttpModule, RouterTestingModule],
            declarations: [LoginComponent],
        });
        signup = {email: 'testuser1@test.com', pass: 'password', first: 'James', last: 'Pearce'};
    });

    it('Verify sign up', (done) => {
        const test = TestBed.createComponent(LoginComponent);
        test.componentInstance.userModel = signup;
        test.componentInstance.signup()
            .then((result: Response) => {
                expect(result.json().emailAddress).toBe(signup.email);
                done();
            });
    });


});

