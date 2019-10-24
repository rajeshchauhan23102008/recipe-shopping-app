import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeResolver } from './recipe.resolver';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
  {
    // path: 'recipes',
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent, resolve: [RecipeResolver] },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolver]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolver]
      }
    ]
    // resolve: [RecipeResolver]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
