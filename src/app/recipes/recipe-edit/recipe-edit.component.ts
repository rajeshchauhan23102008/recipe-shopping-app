import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {

    recipeId: number;
    editMode: boolean = false;

    constructor(private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];

                this.editMode = params['id'] != null ? true : false;
                console.log(this.editMode);
            }
        );
    }


}
