import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    // AuthModule,
    // RecipeModule,
    // ShoppingListModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
