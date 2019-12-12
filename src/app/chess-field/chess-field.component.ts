import { Component, OnInit } from '@angular/core';
import { Figure, StepType, FigureColor, FigureType } from '../models';
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
  private positions: string[];
  private currentColor: FigureColor;
  private dead:{ white:Figure[], black:Figure[] } = { white: [], black: [] };
  constructor() {
    this.currentColor = FigureColor.White;
   }

  ngOnInit() {
    this.figures = FiguresSetting.white;
    this.setPositions()
    this.genField();
  }

  private setPositions(){
    this.positions = this.figures.map(x => `${x.x},${x.y}`);
  }

  genField(){
    for(let i =0; i<8; i++){
      const row = [];
      for(let j = 0; j<8; j++){
        row.push({x: j, y: i});
      }
      this.rows.push(row);
    }
  }

  go(cell){
    if(this.possibleSteps.indexOf(cell.x+','+cell.y)>-1){
      this.activeFigure.x = cell.x;
      this.activeFigure.y = cell.y;
      this.activeFigure['active'] = false;
      this.possibleSteps = [];
      this.setPositions();
      this.currentColor = this.currentColor === FigureColor.Black ? FigureColor.White : FigureColor.Black;
    } else {
      this.activeFigure['active'] = false;
      this.possibleSteps = [];
    }
  }

  take(figure: Figure){
    if(figure.color !== this.currentColor){
      if(this.possibleSteps.indexOf(`${figure.x},${figure.y}`)>-1){
        figure.alive = false;
        this.dead[figure.color].push(figure);
        console.log(this.dead);
        this.go({x: figure.x, y: figure.y})
      }
      return;
    }
    if(this.activeFigure){
      this.activeFigure['active'] = false;
    }
    
    figure.active = !figure.active;
    this.activeFigure = figure;

    const rule = FiguresSetting.rules.find(x => x.type === figure.type);
    this.possibleSteps = [];
    if(rule.steps){
      rule.steps.forEach(s => {
        
        if(!s.if_y || s.if_y.indexOf(this.activeFigure.y)>-1){
          let pos = null;
          if(figure.reverse){
            pos = {x: this.activeFigure.x + (s.x || 0), y: this.activeFigure.y + (s.y*-1 || 0)};
          } else {
            pos = {x: this.activeFigure.x + (s.x || 0), y: this.activeFigure.y + (s.y || 0)};
            
          }
          let f = this.figures.find(x => x.x == pos.x && x.y == pos.y);
          if(f){
            if(f.color !== this.activeFigure.color && !rule.kill){
              this.possibleSteps.push(`${pos.x},${pos.y}`);
            }
            
          } else {
            this.possibleSteps.push(`${pos.x},${pos.y}`);
          }
        }
        
      })
    }
    if(rule.kill){
      rule.kill.forEach(k => {
        let pos = null;
        if(figure.reverse){
          pos = {x: this.activeFigure.x + (k.x || 0), y: this.activeFigure.y + (k.y*-1 || 0)};
        } else {
          pos = {x: this.activeFigure.x + (k.x || 0), y: this.activeFigure.y + (k.y || 0)};
        }
        let f = this.figures.find(x => x.x == pos.x && x.y == pos.y);
          if(f){
            if(f.color !== this.activeFigure.color){
              this.possibleSteps.push(`${pos.x},${pos.y}`);
            }
            
          }
      })
    }
    if(rule.types){
      rule.types.forEach(t =>{
        switch(t){
          case StepType.Diagonal: {
            const step = {
              x: this.activeFigure.x,
              y: this.activeFigure.y
            }
            let next = {
              left:{
                x: -1,
                y: 1
              },
              top:{
                x: 1,
                y: 1
              },
              right:{
                x: 1,
                y: -1
              },
              bottom:{
                x: -1,
                y: -1
              },
            }
            let k = 1
            while(true){
              let keys = Object.keys(next);
              for(let key of keys){
                const pos = { x: step.x+k*next[key].x, y: step.y+k*next[key].y};

                let f = this.figures.find(x => x.x == pos.x && x.y == pos.y);
                if(f){
                  if(f.color !== this.activeFigure.color){
                    this.possibleSteps.push(`${pos.x},${pos.y}`);
                  }
                  delete next[key];
                  
                } else {
                  this.possibleSteps.push(`${pos.x},${pos.y}`);
                }
              }
              k++;
              if(k>7){
                break;
              }
            }
            break;
          }
          case StepType.Strait: {
            const step = {
              x: this.activeFigure.x,
              y: this.activeFigure.y
            }
            let next = {
              left:{
                x: -1,
                y: 0
              },
              top:{
                x: 0,
                y: -1
              },
              right:{
                x: 1,
                y: 0
              },
              bottom:{
                x: 0,
                y: 1
              },
            }
            let k = 1
            while(true){
              let keys = Object.keys(next);
              for(let key of keys){
                const pos = `${step.x+k*next[key].x},${step.y+k*next[key].y}`;
                if(this.positions.indexOf(pos)<0){
                  this.possibleSteps.push(pos);
                }else{
                  delete next[key];
                }
              }
              
              k++;
              if(k>7){
                break;
              }
            }
            break;
          }
        }
        
      })
     
    }
  }

}
