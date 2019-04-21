import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

    //@Output() onRecipeItemSelected = new EventEmitter<Recipe>();

    recipes: Recipe[];

    constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
    }

    // onRecipeItemSelection(recipe: Recipe) {
    //     //this.onRecipeItemSelected.emit(recipe);
    //     this.recipeService.onRecipeSelected.emit(recipe);
    // }

    newRecipe() {
        this.router.navigate(['new'], { relativeTo: this.activatedRoute });
    }

}
