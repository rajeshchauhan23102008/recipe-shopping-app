import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'shopping-list',
    // loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'  // OLD string based Syntax
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        m => m.ShoppingListModule
      )
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then(m => m.RecipeModule)
    // loadChildren: './recipes/recipe.module#RecipeModule' // OLD string based Syntax
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    // loadChildren: './auth/auth.module#AuthModule' // OLD string based Syntax
  },
  { path: '**', redirectTo: '/recipes' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
