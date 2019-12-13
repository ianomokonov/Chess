import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChessFieldComponent } from './chess/chess-field/chess-field.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { ChessComponent } from './chess/chess.component';
import { BingoComponent } from './bingo/bingo.component';
import { AppRoutingModule } from './app-routing.module';
import { BingoFieldComponent } from './bingo/bingo-field/bingo-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessFieldComponent,
    AuthFormComponent,
    RegFormComponent,
    ChooseGameComponent,
    ChessComponent,
    BingoComponent,
    BingoFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
