import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Oranges', 10)
    ];

    //ingredientListUpdated = new EventEmitter();
    // ingredientListUpdated = new EventEmitter<Ingredient[]>();
    ingredientListUpdated = new Subject<Ingredient[]>();


    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {

        // console.log(this.ingredients['name'].indexOf(ingredient.name));

        //validation for duplicate ingredient.
        if (this.ingredients.indexOf(ingredient) === -1) {
            this.ingredients.push(ingredient);
            //this.ingredientListUpdated.emit();
            // this.ingredientListUpdated.emit(this.ingredients.slice());
            this.ingredientListUpdated.next(this.ingredients.slice());

        }

    }

    addIngredients(ingredients: Ingredient[]) {
        //this.ingredients.push(ingredient);

        // for(let i =0 ; i < ingredients.length; i++){
        //     this.ingredients.push(ingredients[i]);
        // }

        // for (let ingredient of ingredients) {
        //     this.ingredients.push(ingredient);
        // }

        this.ingredients.push(...ingredients);
        //this.ingredientListUpdated.emit();
        // this.ingredientListUpdated.emit(this.ingredients.slice());
        this.ingredientListUpdated.next(this.ingredients.slice());

    }


}
