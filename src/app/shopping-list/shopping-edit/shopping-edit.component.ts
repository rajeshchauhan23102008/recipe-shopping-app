import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shoppinglist.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    //@Input() ingredientList: Ingredient[];
    @ViewChild('seForm', { static: false }) seForm: NgForm;
    editMode: boolean;
    editedIngredientIndex: number;
    onIngredientSubscription: Subscription;

    constructor(private slService: ShoppingListService) {

    }

    ngOnInit() {
        // console.log(this.submitBtn.nativeElement.innerText);
        this.editMode = false;

        this.onIngredientSubscription = this.slService.onIngredientEdit.subscribe(
            next => {
                this.editedIngredientIndex = next;
                this.editMode = true;

                const editedIngredient = this.slService.getIngredient(next);

                this.seForm.setValue({
                    'name': editedIngredient.name,
                    'amount': editedIngredient.amount
                });

            }
        );
    }

    onSubmit(seForm: NgForm) {

        const formValues = seForm.value;

        const ingredient = new Ingredient(
            formValues.name,
            formValues.amount
        );

        if (!this.editMode) {

            // Add new Ingredients.

            //this.ingredientList.push(newIngredient);
            this.slService.addIngredient(ingredient);
        } else {

            // Update existing Ingredients.
            this.slService.updateIngredient(ingredient, this.editedIngredientIndex);

        }

        seForm.reset();
        this.editMode = false;
        //this.slService.ingredientListUpdated.emit();
    }

    onClear() {
        this.seForm.reset();
        this.editMode = false;
    }

    onDelete() { 
        this.slService.deleteIngredient(this.editedIngredientIndex);
        this.onClear();
    }

    ngOnDestroy() {
        this.onIngredientSubscription.unsubscribe();
    }

}
