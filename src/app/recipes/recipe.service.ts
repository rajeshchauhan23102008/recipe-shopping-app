import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { EventEmitter } from '@angular/core';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Power Pork Meat', 'Power pork meat recipe',
            'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
            [
                new Ingredient('Meat', 100),
                new Ingredient('Tomato Checkup', 50)
            ]),
        new Recipe('Aloo Chat', 'Indian Aloo chat recipe',
            'https://upload.wikimedia.org/wikipedia/commons/5/58/Aloo_chat_Recipe.JPG',
            [
                new Ingredient('Aloo', 10),
                new Ingredient('Chat Masala', 40)
            ])
    ];

    onRecipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }

}
