import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Figure, StepType, FigureColor, FigureType } from '../../models';
import { FiguresSetting } from '../figures-setting';
import { ChessService } from 'src/app/services/chess.service';
import { forkJoin, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { WebsocketService } from 'src/app/services/websockets.service';

@Component({
  selector: 'chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.less']
})
export class ChessFieldComponent implements OnInit, OnChanges {


  @Input() gameId: number;

  public rows = []
  public figures: Figure[];
  public activeFigure: Figure;
  public possibleSteps = [];
  private currentColor: FigureColor;
  private socket: Subject<any>;
  public dead:{ white:Figure[], black:Figure[] } = { white: [], black: [] };
  constructor( private cs: ChessService, private router: Router, private ws:WebsocketService) {
    this.currentColor = FigureColor.White;
  }

  ngOnChanges(){
    if(this.rows.length){
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.possibleSteps = [];
    this.activeFigure = null;
    this.currentColor = FigureColor.White;
    this.figures = JSON.parse(JSON.stringify(FiguresSetting.white));
    this.rows = [];
    this.dead = { white: [], black: [] };
    this.genField();
    this.socket = <Subject<any>>this.ws.connect('ws://127.0.0.1:7777').pipe(
    map((response: MessageEvent): string => {
      let data = JSON.parse(response.data);
      return data;
    }));
    this.socket.subscribe(x => {
      console.log(x)
      this.figureGo(x);
    })
    forkJoin([
      this.cs.getGame(this.gameId),
      this.cs.getGameSteps(this.gameId)
    ]).subscribe(([game, steps]) => {
      if(game){
        this.currentColor = game.color;
        this.figures = game.figures;
        steps.forEach(x => {
          const figure = this.figures.find(f => f.id === x.figureId);
          figure.x = x.x;
          figure.y = x.y;
        })
        
          

        this.socket.subscribe(x => {
          this.figureGo(x);
        })
      } else {
        this.router.navigate(['choose']);
      }
      
    },
    error => { console.error('Игра не загружена с сервера!')})
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

  figureGo(figure: any){
    const f = this.figures.find(x => x.id == figure.id);
    f.x = figure.x;
    f.y = figure.y;
  }

  go(cell){
    if(!this.activeFigure){
      return;
    }
    
    if(this.possibleSteps.indexOf(cell.x+','+cell.y)>-1){
      this.possibleSteps = [];
      this.activeFigure.x = cell.x;
        this.activeFigure.y = cell.y;
        this.activeFigure['active'] = false;
        this.currentColor = this.currentColor === FigureColor.Black ? FigureColor.White : FigureColor.Black;
        this.socket.next({id: 2, x:cell.x, y:cell.y});
      
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
        this.figures.splice(this.figures.findIndex(x => x.x == figure.x && x.y == figure.y), 1);
        
        if(figure.type === FigureType.King){
          alert(this.currentColor + ' win!' )
          this.ngOnInit();
        }
        this.go({x: figure.x, y: figure.y});
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
        }
        
      })
     
    }
  }

}
