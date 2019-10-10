import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLogin: boolean = true;
    isLoading: boolean = false;
    error: string;

    // @ViewChild('authForm', { static: true }) authForm: NgForm;

    constructor(private authService: AuthService) {
        // console.log(this.authForm);
    }

    onSubmit(authForm: NgForm) {

        // console.log(authForm);

        // window.authForm = authForm;


        if (this.isLogin) {
            // TODO - User Login.

        } else {
            // TODO - User SignUp.
            // console.log(authForm.);
            // console.log(authForm);
            // console.log(authForm.value);

            this.isLoading = true;

            this.authService.signUp(authForm.value.email, authForm.value.password).subscribe(
                response => {
                    console.log(response);
                    this.isLoading = false;
                    authForm.reset();
                }, errorMsg => {
                    console.log(errorMsg);
                    this.isLoading = false;
                    this.error = errorMsg;
                }
            );
        }

    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}