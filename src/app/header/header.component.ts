import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User = null;
  private userAuthSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAuthSubscription = this.authService.userAuthenticated.subscribe(
      authUser => {
        // console.log(authUser);
        this.user = authUser ? authUser : null;

        // if (!this.user) {
        //   this.router.navigate(['/auth']);
        // }
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
  }

  ngOnDestroy() {
    this.userAuthSubscription.unsubscribe();
  }
}
