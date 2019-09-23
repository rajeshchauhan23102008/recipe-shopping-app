import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipeId: number;
    editMode: boolean = false;
    recipeAddEditForm: FormGroup;

    constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService,
        private router: Router) {

    }

    get formIngredients() {
        return (<FormArray>this.recipeAddEditForm.get('ingredients'));
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];

                this.editMode = params['id'] != null ? true : false;
                // console.log(this.editMode);

                this.initForm();
            }
        );
    }

    initForm() {

        let recipe;

        if (this.editMode) {
            recipe = this.recipeService.getRecipe(this.recipeId);

        } else {
            recipe = new Recipe('', '', '', []);
        }

        this.recipeAddEditForm = new FormGroup({
            'name': new FormControl(recipe.name, Validators.required),
            'imagePath': new FormControl(recipe.imagePath, Validators.required),
            'description': new FormControl(recipe.description, Validators.required),
            'ingredients': this.initIngredients(recipe)
        });

    }

    private initIngredients(recipe: Recipe): FormArray {


        let ingredients = new FormArray([]);

        if (this.editMode) {
            for (let ingredient of recipe.ingredients) {
                ingredients.push(
                    new FormGroup({
                        'name': new FormControl(ingredient.name, Validators.required),
                        'amount': new FormControl(ingredient.amount,
                            [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                    })
                );
            }
        } else {
            ingredients.push(new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
        }

        return ingredients;
    }

    onSubmit() {

        if (this.editMode) {
            this.recipeService.updateRecipe(this.recipeAddEditForm.value, this.recipeId);
        } else {
            this.recipeService.addRecipe(this.recipeAddEditForm.value);
        }

        // Rediret to Recipes List Page.
        this.router.navigate(['/recipes']);
    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute })

    }

    onDeleteIngredient(index: number) {
        let formArray = this.recipeAddEditForm.get('ingredients') as FormArray;
        formArray.removeAt(index);
    }

    onAddMoreIngredient() {
        const formArray = this.recipeAddEditForm.get('ingredients') as FormArray;

        formArray.push(new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
    }




}
