import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shoppinglist.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit {

    //@Input() ingredientList: Ingredient[];
    @ViewChild('submitBtn', { static: true }) submitBtn: ElementRef;
    editMode: boolean = false;


    constructor(private slService: ShoppingListService) {

    }

    ngOnInit() {
        // console.log(this.submitBtn.nativeElement.innerText);
        this.submitBtn.nativeElement.innerText = this.editMode ? 'Edit' : 'Add';
    }

    addNewIngredient(seForm: NgForm) {

        const formValues = seForm.value;

        if (!this.editMode) {

            // Add new Ingredients.

            const newIngredient = new Ingredient(
                formValues.name,
                formValues.amount
            );

            //this.ingredientList.push(newIngredient);
            this.slService.addIngredient(newIngredient);
        } else {

            // Update existing Ingredients.

            // TODO.
        }
        //this.slService.ingredientListUpdated.emit();
    }

}
