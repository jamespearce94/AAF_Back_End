import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

/**
 * This class provides the Activity service with methods to read names and add names.
 */
@Injectable()
export class ActivityService {
    private headers: Headers;
    public action = 'home'
    private current = '';
    private token;
    activity: any[] = [{}];

    /**
     * Creates a new ActivityService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    constructor(private http: Http, private notificationsService: NotificationsService, private route: Router) {

    }

    /**
     * @return {any}
     * get token from the browser local storage
     */
    getToken(): string {

        if (!localStorage.getItem('user')) {
            this.token = 'not avaliable';
            this.route.navigate(['login']);
        } else {
            let currentUser = JSON.parse(localStorage.getItem('user'));
            this.token = currentUser.token
        }

        return this.token;
    }

    /**
     * @return {string}
     * get name from the browser local storage
     */
    getName(): string {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        let name = currentUser.firstName + ' ' + currentUser.lastName;
        return name;
    }

    /**
     * @return {any}
     * get email from the browser local storage
     */
    getEmail(): string {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        return currentUser.emailAddress;
    }

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
     * get the logged in users activities
     */
    getUser(): Observable<string[]> {
        this.headers = new Headers();
        let token = this.getToken()
        let email = this.getEmail();
        this.headers.append('Authorization', token)
        return this.http.get('http://localhost:3000/activities/user/' + email, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch(this.handleError)

    }

    /**
     * @return {Observable<R>}
     * get a listed of the logged in user's and shared activities
     */
    getAll() {
        this.headers = new Headers();
        let token = this.getToken();
        this.headers.append('Authorization', token)
        return this.http.get('http://localhost:3000/activities/all', {headers: this.headers})
            .map((res: Response) => res.json())
            .catch(this.handleError)

    }

    /**
     * @return {Observable<R>}
     * update the list of users activities
     */
    updateUsers() {
        this.headers = new Headers();
        let token = this.getToken();
        let email = this.getEmail();
        this.headers.append('Authorization', token)
        return this.http.get('http://localhost:3000/activities/user/' + email, {headers: this.headers})
            .map((res: Response) => res.json())
            .catch(this.handleError)
    }

    /**
     * @param id
     * @return {Observable<R>}
     * get the current selected activity
     */
    getDetails(id): Observable<any> {
        if (id == '') {
            this.notificationsService.error('Error', 'Activity not found');
            this.route.navigate(['home']);
        }
        else {
            this.headers = new Headers();
            let token = this.getToken();
            if (token == null) {
                this.route.navigate(['home']);
            }
            this.headers.append('Authorization', token)
            return this.http.get('http://localhost:3000/activities/details/' + id, {headers: this.headers})
                .map((res: Response) => res.json())
                .catch(this.handleError)
        }

    }

    /**
     * Handle HTTP error
     */
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        if (errMsg == '401 - Unauthorized') {
            this.route.navigate(['login']);
        }
        return Observable.throw(errMsg);

    }
}
