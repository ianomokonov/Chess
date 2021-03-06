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
import { ChessWinComponent } from './chess/chess-win/chess-win.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BingoCardComponent } from './bingo/bingo-card/bingo-card.component';

//HTTP запросы
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { AuthService } from './services/auth.service';
import { ChessService } from './services/chess.service';
import { BingoService } from './services/bingo.service';
import { UserGuard } from './guards/user.guard';
import { WebsocketService } from './services/websockets.service';

@NgModule({
  declarations: [
    AppComponent,
    ChessFieldComponent,
    AuthFormComponent,
    RegFormComponent,
    ChooseGameComponent,
    ChessComponent,
    BingoComponent,
    BingoFieldComponent,
    ChessWinComponent,
    BingoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
    },
    HttpClient,
    AuthService,
    ChessService,
    BingoService,
    UserGuard,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
