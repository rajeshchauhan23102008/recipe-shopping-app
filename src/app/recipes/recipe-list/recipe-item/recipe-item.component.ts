import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeFromListComp') recipe: Recipe;
  @Output() onRecipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelection() {
    this.onRecipeSelected.emit();
  }

}
