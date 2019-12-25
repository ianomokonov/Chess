import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChessService } from '../services/chess.service';
import { BingoService } from '../services/bingo.service';
import { FigureColor } from '../models';
import { WebsocketService } from '../services/websockets.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-choose-game',
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.less']
})
export class ChooseGameComponent implements OnInit {
  public chooseForm: FormGroup;
  constructor( private _fb: FormBuilder, private router: Router, private chessService: ChessService,
    private bingoService: BingoService, private ws:WebsocketService) { }

  ngOnInit() {
    this.bingoService.userId = null;
    this.chessService.userId = null;
    this.chessService.white = true;
    this.chooseForm = this._fb.group({
      type: [GameType.Chess, Validators.required],
      color: [FigureColor.White, Validators.required],
      gameId: [null]
    })

    this.ws.socket.pipe(
      filter(vl => vl)
    ).subscribe(x => {
      console.log(x);
      console.log(sessionStorage.getItem('userId'));
      //this.router.navigate([this.chooseForm.value.type, x]);
    })
  }

  create(){
    if(this.chooseForm.value.type == GameType.Chess){
      this.ws.socket.next({key:'add-game', value: {
        Type: this.chooseForm.value.type,
        FirstPlayerId: sessionStorage.getItem('userId'),
        Color: this.chooseForm.value.color
      }});
    }else{
      this.ws.socket.next({key:'add-game', value: {
        Type: this.chooseForm.value.type,
        FirstPlayerId: sessionStorage.getItem('userId')}});
    }
  }

  choose(){
    this.ws.socket.next({key:'enter-game', value:{
      id:this.chooseForm.value.gameId,
      PlayerId:sessionStorage.getItem('userId')}});
  }

}


export enum GameType{
  Chess = 'chess',
  Bingo = 'bingo'
}
