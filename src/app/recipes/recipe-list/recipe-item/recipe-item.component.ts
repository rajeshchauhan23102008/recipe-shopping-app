import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeFromListComp') recipe: Recipe;
  @Input('recipeIndex') recipeIndex: number; 

  constructor(private router: Router) { }

  ngOnInit() {

  }


}
