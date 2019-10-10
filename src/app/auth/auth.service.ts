import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface SignUpResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    signUp(email: string, password: string) {

        return this.httpClient
            .post<SignUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLQeGzOjJOJWZr81XoaixJL4wsZEIyc8k',
                { email: email, password: password, returnSecureToken: true })
            .pipe(catchError(
                errorRes => {

                    let message = errorRes.error.error.message;

                    switch (message) {
                        case 'EMAIL_EXISTS':
                            message = `Error - Email already exists`;
                            break;
                        default:
                            break;
                    }
                    return throwError(message);
                }
            ));
    }
}