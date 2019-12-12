import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChessFieldComponent } from './chess-field/chess-field.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessFieldComponent,
    AuthFormComponent,
    RegFormComponent,
    ChooseGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
