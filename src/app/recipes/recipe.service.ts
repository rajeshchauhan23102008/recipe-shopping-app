import { Recipe } from '../recipes/recipe.model';
// import { Ingredient } from '../shared/ingredient.model';

// import { EventEmitter } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

import { Subject } from 'rxjs';

export class RecipeService {

    private recipes: Recipe[] = [];

    recipesUpdated = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Power Pork Meat', 'Power pork meat recipe',
    //         'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
    //         [
    //             new Ingredient('Meat', 100),
    //             new Ingredient('Tomato Checkup', 50)
    //         ]),
    //     new Recipe('Aloo Chat', 'Indian Aloo chat recipe',
    //         'https://upload.wikimedia.org/wikipedia/commons/5/58/Aloo_chat_Recipe.JPG',
    //         [
    //             new Ingredient('Aloo', 10),
    //             new Ingredient('Chat Masala', 40)
    //         ])
    // ];


    // samosa imagePath
    //https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosachutney.jpg

    // onRecipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesUpdated.next(this.recipes.slice());

    }

    updateRecipe(recipe: Recipe, index: number) {
        this.recipes[index] = recipe;
        this.recipesUpdated.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesUpdated.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {

        if (recipes) {
            this.recipes = recipes.slice();
            this.recipesUpdated.next(this.recipes.slice());
        }
    }
}
