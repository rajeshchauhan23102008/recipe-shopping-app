import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    user: User = null;

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.authService.userAuthenticated.subscribe(
            authUser => {

                // console.log(authUser);
                this.user = authUser ? authUser : null;

                if (!this.user) {
                    this.router.navigate(['/auth']);
                }
            }
        );
    }

    saveDataToDB() {

        this.dataStorageService.saveRecipes();

    }

    fetchDataFromDB() {

        this.dataStorageService.fetchRecipes();

    }

    onLogout() {
        this.authService.logout();
    };

}
