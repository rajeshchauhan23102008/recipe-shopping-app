import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    providers: [RecipeService]
})
export class RecipesComponent {

    selectedRecipeValue: Recipe;

    constructor(private recipeService: RecipeService) {
        this.recipeService.onRecipeSelected.subscribe(
            (recipe: Recipe) => {
                this.selectedRecipeValue = recipe;
            }
        );
    }
}
