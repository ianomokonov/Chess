import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChessService } from '../services/chess.service';
import { BingoService } from '../services/bingo.service';
import { FigureColor } from '../models';

@Component({
  selector: 'app-choose-game',
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.less']
})
export class ChooseGameComponent implements OnInit {
  public chooseForm: FormGroup;
  constructor( private _fb: FormBuilder, private router: Router, private chessService: ChessService,
    private bingoService: BingoService ) { }

  ngOnInit() {
    this.bingoService.userId = null;
    this.chessService.userId = null;
    this.chessService.white = true;
    this.chooseForm = this._fb.group({
      type: [GameType.Chess, Validators.required],
      color: [FigureColor.White, Validators.required],
      gameId: [null]
    })
  }

  create(){
    if(this.chooseForm.value.type == GameType.Chess){
      this.chessService.createGame({type: FigureColor.White}).subscribe( id=> {
        this.router.navigate([GameType.Chess, id]);
      })
    }else{
      this.bingoService.createGame({}).subscribe( id=> {
        this.router.navigate([GameType.Bingo, id]);
      })
    }
  }

  choose(){
    if(this.chooseForm.value.type == GameType.Chess){
      this.router.navigate([GameType.Chess, this.chooseForm.value.gameId]);
    }else{
      this.router.navigate([GameType.Bingo, this.chooseForm.value.gameId]);
    }
  }

}


export enum GameType{
  Chess = 'chess',
  Bingo = 'bingo'
}
