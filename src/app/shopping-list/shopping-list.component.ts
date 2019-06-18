import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shoppinglist.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

    ingredients: Ingredient[];

    constructor(private slService: ShoppingListService) {

    }

    ngOnInit() {

        this.ingredients = this.slService.getIngredients();

        // this.shoppingListService.ingredientListUpdated.subscribe(
        //     () => { this.ingredients = this.shoppingListService.getIngredients(); }
        // );

        this.slService.ingredientListUpdated.subscribe(
            (ingredients) => { this.ingredients = ingredients; }
        );

    }

    editIngredient(index: number) {
        this.slService.onIngredientEdit.next(index);
    }
}
