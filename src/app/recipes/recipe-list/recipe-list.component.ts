import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {

    //@Output() onRecipeItemSelected = new EventEmitter<Recipe>();

    recipes: Recipe[];
    recipeServiceSubs: Subscription;

    constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();

        this.recipeServiceSubs = this.recipeService.recipesUpdated.subscribe(
            recipes => this.recipes = recipes
        );
    }

    // onRecipeItemSelection(recipe: Recipe) {
    //     //this.onRecipeItemSelected.emit(recipe);
    //     this.recipeService.onRecipeSelected.emit(recipe);
    // }

    newRecipe() {
        this.router.navigate(['new'], { relativeTo: this.activatedRoute });
    }

    ngOnDestroy() { 
        this.recipeServiceSubs.unsubscribe();
    }

}
