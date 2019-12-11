import { Component, OnInit } from '@angular/core';
import { Figure } from '../models';
import { FiguresSetting } from '../figures-setting';

@Component({
  selector: 'chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.less']
})
export class ChessFieldComponent implements OnInit {
  public rows = []
  public figures: Figure[];
  public activeFigure: Figure;
  public possibleSteps = [];
  constructor() { }

  ngOnInit() {
    this.figures = FiguresSetting.white;
    this.genField();
  }

  genField(){
    for(let i =0; i<8; i++){
      const row = [];
      for(let j = 0; j<8; j++){
        row.push({x: j, y: i});
      }
      this.rows.push(row);
    }

    console.log(this.rows)
  }

  take(figure){
    if(this.activeFigure){
      this.activeFigure['active'] = false;
    }
    
    figure.active = !figure.active;
    this.activeFigure = figure;

    const rule = FiguresSetting.rules.find(x => x.type === figure.type);
    this.possibleSteps = [];
    if(rule.steps){
      rule.steps.forEach(s => {
        this.possibleSteps.push(`${this.activeFigure.x + (s.x || 0)},${this.activeFigure.y + (s.y || 0)}`)
      })
    }
    console.log(this.possibleSteps)
  }

}
