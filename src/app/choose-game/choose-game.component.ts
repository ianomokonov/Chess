import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-game',
  templateUrl: './choose-game.component.html',
  styleUrls: ['./choose-game.component.less']
})
export class ChooseGameComponent implements OnInit {
  public chooseForm: FormGroup;
  constructor( private _fb: FormBuilder, private router: Router ) { }

  ngOnInit() {
    this.chooseForm = this._fb.group({
      type: [GameType.Chess, Validators.required],
      gameId: [null]
    })
  }

  create(){
    if(this.chooseForm.value.type == GameType.Chess){
      this.router.navigate([GameType.Chess]);
    }else{
      this.router.navigate([GameType.Bingo]);
    }
  }

}


export enum GameType{
  Chess = 'chess',
  Bingo = 'bingo'
}
