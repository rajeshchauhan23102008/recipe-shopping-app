import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'This is my First Test Recipe',
            'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d'),
        new Recipe('Test Recipe', 'This is my First Test Recipe',
                'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d')
        ];

}
