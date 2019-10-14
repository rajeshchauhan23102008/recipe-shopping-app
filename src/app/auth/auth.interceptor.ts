import { HttpRequest, HttpInterceptor, HttpHandler, HttpParams } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.userAuthenticated.pipe(
            take(1),
            exhaustMap(user => {
                if (user) {
                    const modifiedReq = req.clone({
                        'params': new HttpParams().set('auth', user.token)
                    });

                    return next.handle(modifiedReq);
                }

                return next.handle(req);
            })

        );

        // let token = null;

        // this.authService.userAuthenticated.pipe(take(1)).subscribe(user => {
        //     token = user.token;
        // });

        // if (token) {
        //     const modifiedReq = req.clone({
        //         'params': new HttpParams().set('auth', token)
        //     })

        //     return next.handle(modifiedReq);
        // }

        // return next.handle(req);

    }
}