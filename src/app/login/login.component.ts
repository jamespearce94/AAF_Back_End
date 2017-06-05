import {Component} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {Response, Http} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './login.component.html',
    styleUrls: [
        'login.css'
    ]
})

export class LoginComponent {

    action: string;
    userModel = {email: "", pass: "", first: "", last: ""};
    loginModel = {email: "", pass: ""};

    /**
     * @param notificationService
     * @param route
     * @param http
     */
    constructor(private notificationService: NotificationsService, public route: Router, private http: Http) {
    }

    /**
     * @return {Promise<|Response>|Promise<>|Promise<Response>}
     * Post new user to the back end and direct back to login
     */
    signup(): Promise<any> {
        return this.http.post("http://localhost:3000/users", this.userModel)
            .toPromise()
            .then((result: Response) => {
                    this.action = 'login';
                    return result;
                },
                err => {
                    if (err.status == 409) {
                        this.notificationService.error(err.status, 'Account already exists');
                    }
                });


    }

    /**
     * Post user form data to back end users/auth
     * If valid save the returned user
     * Redirect to home
     */
    login() {
        if ((this.loginModel.email == "") || (this.loginModel.pass == "")) {
            this.notificationService.error('Error', 'Please enter Username and password');
        }
        else {

            this.http.post("http://localhost:3000/users/auth", this.loginModel)
                .subscribe((result: Response) => {
                        localStorage.setItem('user', JSON.stringify(result.json()));
                        let user = JSON.parse(localStorage.getItem('user'));
                        this.notificationService.success('Success', 'You are logged in');
                        this.redirect();

                    },
                    err => {
                        if (err.status == 409) {
                            this.notificationService.error(err.status, 'Invalid Password');
                        }
                        if (err.status == 404) {
                            this.notificationService.alert('Warning', 'Account not found');
                        }
                    }
                );
        }


    }

    /**
     * route to the hom page
     */
    redirect() {
        this.route.navigate(['/home']);
    }

}