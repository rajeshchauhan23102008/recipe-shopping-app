import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

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
  autoLogoutTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap(response => {
          // console.log(response);
          this.getAuthenticatedUser(response);
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap(response => {
          // console.log(response);
          this.getAuthenticatedUser(response);
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const stringfyUserData = localStorage.getItem('userData');

      if (stringfyUserData) {
        const userObj = JSON.parse(stringfyUserData);

        const expirationDate = new Date(userObj._tokenExpirationDate);

        const user = new User(
          userObj.email,
          userObj.Id,
          userObj._token,
          expirationDate
        );

        // console.log(user);

        // set autologout().
        const expirationTimeInMilliSeconds =
          expirationDate.getTime() - new Date().getTime();

        this.autoLogout(expirationTimeInMilliSeconds);

        this.userAuthenticated.next(user);
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userData');
      this.userAuthenticated.next(null);
      this.router.navigate(['/auth']);

      if (this.autoLogoutTimer) {
        clearTimeout(this.autoLogoutTimer);
      }

      this.autoLogoutTimer = null;
    }
  }

  autoLogout(expirationTimeInMilliSeconds: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationTimeInMilliSeconds);
  }

  private getAuthenticatedUser(response: AuthResponse) {
    if (isPlatformBrowser(this.platformId)) {
      const tokenExpirationDate = new Date(
        new Date().getTime() + parseInt(response.expiresIn) * 1000
      );
      const user = new User(
        response.email,
        response.localId,
        response.idToken,
        tokenExpirationDate
      );

      // console.log(user);

      // preserve user in persistent storage at client.
      if (user) {
        const stringigyUser = JSON.stringify(user);

        localStorage.setItem('userData', stringigyUser);
      }

      // set AutoLogout.
      this.autoLogout(parseInt(response.expiresIn) * 1000);

      this.userAuthenticated.next(user);
    }
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
