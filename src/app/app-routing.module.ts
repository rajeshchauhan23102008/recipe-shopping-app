import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { AuthComponent } from './auth/auth.component';

import { RecipeResolver } from './shared/recipe.resolver';

const routes: Routes =
    [
        { path: '', redirectTo: '/recipes', pathMatch: 'full' },
        {
            path: 'recipes',
            component: RecipesComponent,
            children: [
                { path: '', component: RecipeStartComponent, resolve: [RecipeResolver] },
                { path: 'new', component: RecipeEditComponent },
                { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
                { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver] }
            ]
            // resolve: [RecipeResolver]
        },
        { path: 'shopping-list', component: ShoppingListComponent },
        { path: 'auth', component: AuthComponent },
        { path: '**', redirectTo: '/recipes' },
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
