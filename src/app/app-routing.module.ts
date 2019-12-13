import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { ChessComponent } from './chess/chess.component';
import { BingoComponent } from './bingo/bingo.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: AuthFormComponent},
  {path: 'reg', component: RegFormComponent},
  {path: 'chess', component: ChessComponent},
  {path: 'bingo', component: BingoComponent},
  // {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
