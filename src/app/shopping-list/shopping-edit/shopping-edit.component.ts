import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('amountInput') amountInput: ElementRef;

    @Input() ingredientList: Ingredient[];

    addNewIngredient() {
        const newIngredient = new Ingredient(
            this.nameInput.nativeElement.value,
            this.amountInput.nativeElement.value
        );

        this.ingredientList.push(newIngredient);
    }

}
