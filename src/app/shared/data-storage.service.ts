import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private recipeService: RecipeService,
        private httpClient: HttpClient) { }

    saveRecipes() {


        const recipes = this.recipeService.getRecipes();

        this.httpClient.put('https://therecipeapp-ca066.firebaseio.com/recipes.json', recipes).subscribe();
    }

    fetchRecipes() {

        this.httpClient.get<Recipe[]>('https://therecipeapp-ca066.firebaseio.com/recipes.json').subscribe(
            (response) => {
                // console.log(response);
                // set recipes data into recipes data structure.
                this.recipeService.setRecipes(response);

            },
            (error) => {
                console.log(error.message);
            }
        )
    }
}