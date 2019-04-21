import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shared/shoppinglist.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  recipeId: number;

  constructor(private slService: ShoppingListService, private router: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeId);
      }
    );

  }

  toShoppingList() {
    this.slService.addIngredients(this.selectedRecipe.ingredients);
    //this.slService.ingredientListUpdated.emit();
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });

    // this.router.navigate(['../', this.recipeId, 'edit'], { relativeTo: this.activatedRoute });

  }

}
