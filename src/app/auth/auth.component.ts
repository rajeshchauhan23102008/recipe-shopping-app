import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

    isLogin: boolean = true;
    isLoading: boolean = false;
    error: string = '';
    private authObs: Observable<AuthResponse>;

    // @ViewChild('authForm', { static: true }) authForm: NgForm;

    constructor(private authService: AuthService, private router: Router) {
        // console.log(this.authForm);
    }

    ngOnInit() {

    }

    onSubmit(authForm: NgForm) {

        // console.log(authForm);

        // window.authForm = authForm;



        if (this.isLogin) {
            // TODO - User Login.

            this.isLoading = true;

            this.authObs = this.authService.login(authForm.value.email, authForm.value.password);

        } else {
            // TODO - User SignUp.
            // console.log(authForm.);
            // console.log(authForm);
            // console.log(authForm.value);

            this.isLoading = true;

            this.authObs = this.authService.signUp(authForm.value.email, authForm.value.password);
        }

        this.authObs.subscribe(
            response => {
                this.isLoading = false;
                authForm.reset();
                // console.log(response);
                this.error = '';

                this.router.navigate(['/recipes']);

            },
            errorMsg => {
                this.isLoading = false;
                // console.log(errorMsg);
                this.error = errorMsg;
            }
        );

    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}