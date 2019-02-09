import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shared/shoppinglist.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input() selectedRecipe: Recipe;

  constructor(private slService: ShoppingListService) {

  }

  toShoppingList() {
    this.slService.addIngredients(this.selectedRecipe.ingredients);
    //this.slService.ingredientListUpdated.emit();
  }

}
