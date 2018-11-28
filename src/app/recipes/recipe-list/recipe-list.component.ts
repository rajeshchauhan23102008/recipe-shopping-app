import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {

    @Output() onRecipeItemSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('Test Recipe 1', 'This is my First Test Recipe',
            'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d'),
        new Recipe('Test Recipe 2', 'This is my Second Test Recipe',
                'https://upload.wikimedia.org/wikipedia/commons/5/58/Aloo_chat_Recipe.JPG')
        ];

        onRecipeItemSelection(recipe: Recipe) {
            this.onRecipeItemSelected.emit(recipe);
        }

}
