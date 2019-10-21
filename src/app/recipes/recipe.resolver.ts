import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<null> {
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.getRecipes().length === 0) {
      this.dataStorageService.fetchRecipes();
    }

    // this.recipeService.getRecipes();

    return of(null);
  }
}
