import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userAuthenticated: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private httpClient: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {

        return this.httpClient
            .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLQeGzOjJOJWZr81XoaixJL4wsZEIyc8k',
                { email: email, password: password, returnSecureToken: true })
            .pipe(catchError(this.handleError), tap(response => {
                // console.log(response);
                this.getAuthenticatedUser(response);
            }));
    }

    login(email: string, password: string) {

        return this.httpClient
            .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLQeGzOjJOJWZr81XoaixJL4wsZEIyc8k',
                { email: email, password: password, returnSecureToken: true })
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    // console.log(response);
                    this.getAuthenticatedUser(response);
                })
            );
    }

    logout() {
        this.userAuthenticated.next(null);
        this.router.navigate(['/auth']);
    }

    private getAuthenticatedUser(response: AuthResponse) {

        const tokenExpirationDate = new Date(new Date().getTime() + (parseInt(response.expiresIn) * 1000));
        const user = new User(response.email, response.localId, response.idToken, tokenExpirationDate);

        // console.log(user);

        this.userAuthenticated.next(user);
    }

    private handleError(errorRes) {

        let message = 'An unknown error occured';

        if (!errorRes || !errorRes.error || !errorRes.error.error) {
            return throwError(message);
        }

        message = errorRes.error.error.message;

        switch (message) {
            case 'EMAIL_EXISTS':
                message = `Error - Email already exists`;
                break;
            case 'EMAIL_NOT_FOUND':
                message = 'Email Id not Found';
                break;
            case 'INVALID_PASSWORD':
                message = 'Invalid password';
                break;
            default:
                break;
        }

        return throwError(message);

    }
}