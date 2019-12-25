import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Figure, StepType, FigureColor, FigureType } from '../../models';
import { FiguresSetting } from '../figures-setting';
import { ChessService } from 'src/app/services/chess.service';
import { forkJoin, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { WebsocketService } from 'src/app/services/websockets.service';

@Component({
  selector: 'chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.less']
})
export class ChessFieldComponent implements OnInit, OnChanges {


  @Input() gameId: number;

  public rows = [];
  private userId = 1;
  public figures: Figure[];
  public activeFigure: Figure;
  public possibleSteps = [];
  private currentColor: FigureColor;
  private playerColor: FigureColor;
  public dead:{ white:Figure[], black:Figure[] } = { white: [], black: [] };
  constructor( private cs: ChessService, private router: Router, private ws:WebsocketService) {
    this.currentColor = FigureColor.White; this.userId = +sessionStorage.getItem('userId');
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
    this.genField()
    this.ws.socket.pipe(
      filter(vl => vl)
     ).subscribe(x => {
      console.log(x)
      if(x){
        if(x.FirstPlayerId == this.userId){
          this.playerColor = x.Color
        } else {
          this.playerColor = x.Color == FigureColor.White ? FigureColor.Black : FigureColor.White;
        }
        if(x.Figures){
          this.figures = (x.Figures as Figure[]).map(f => {
            f.alive = true;
            
            if(this.playerColor == FigureColor.Black){
              f.y = 7 - f.y;
              f.x = 7 - f.x;
            } else {
              f.y = +f.y;
              f.x = +f.x;
            }
            
            f.reverse = f.Color == this.playerColor && f.Type == FigureType.Pawn;
            
            return f;
          });
          console.log(this.figures);
        }
      }
      if(x.key){
        switch(x.key){
          case 'step':{
            this.figureGo(x);
            break;
          }
          case 'kill': {
            const figureIndex = this.figures.findIndex(f => f.Id == x.id)
            this.figures[figureIndex].alive = false;
            this.dead[this.figures[figureIndex].Color].push(this.figures[figureIndex]);
            this.figures.splice(figureIndex, 1);
          }
        }
        
      }
      
    });
    setTimeout(x => {
      this.ws.socket.next({key: 'get-game', id: this.gameId});
    }, 100);
    
    
    // forkJoin([
    //   this.cs.getGame(this.gameId),
    //   this.cs.getGameSteps(this.gameId)
    // ]).subscribe(([game, steps]) => {
    //   if(game){
    //     this.currentColor = game.Color;
    //     this.figures = game.figures;
    //     steps.forEach(x => {
    //       const figure = this.figures.find(f => f.id === x.figureId);
    //       figure.x = x.x;
    //       figure.y = x.y;
    //     })
    //     // this.ws.socket.subscribe(x => {
    //     //   this.figureGo(x);
    //     // })
    //   } else {
    //     this.router.navigate(['choose']);
    //   }
      
    // },
    // error => { console.error('Игра не загружена с сервера!')})
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
    console.log(figure)
    const f = this.figures.find(x => x.Id == figure.id);
    console.log(figure)
    
    
    if(figure.color != this.playerColor){
      this.currentColor = this.playerColor;
      f.x = 7-figure.x;
      f.y = 7-figure.y;
    }
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
        this.ws.socket.next({key: 'step', id: this.activeFigure.Id, x:cell.x, y:cell.y, color: this.playerColor});
      
    } else {
      this.activeFigure['active'] = false;
      this.possibleSteps = [];
    }
  }

  take(figure: Figure){
    console.log([figure.Color, this.playerColor])
    if(figure.Color !== this.playerColor || figure.Color !== this.currentColor){
      if(this.possibleSteps.indexOf(`${figure.x},${figure.y}`)>-1){
        
        
        this.ws.socket.next({key: 'kill', id: figure.Id, color: figure.Color});
        if(figure.Type === FigureType.King){
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

    const rule = FiguresSetting.rules.find(x => x.Type == figure.Type);
    console.log(rule)
    console.log(this.activeFigure)
    this.possibleSteps = [];
    if(rule.steps){
      rule.steps.forEach(s => {
        console.log(!s.if_y || s.if_y.indexOf(this.activeFigure.y)>-1)
        if(!s.if_y || s.if_y.indexOf(this.activeFigure.y)>-1){
          let pos = null;
          if(figure.reverse){
            pos = {x: this.activeFigure.x + (s.x || 0), y: this.activeFigure.y + (s.y*-1 || 0)};
          } else {
            pos = {x: this.activeFigure.x + (s.x || 0), y: this.activeFigure.y + (s.y || 0)};
            
          }
          let f = this.figures.find(x => x.x == pos.x && x.y == pos.y);
          console.log(pos)
          if(f){
            if(f.Color != this.activeFigure.Color && !rule.kill){
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
            if(f.Color !== this.activeFigure.Color){
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
                  if(f.Color !== this.activeFigure.Color){
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
                  if(f.Color !== this.activeFigure.Color){
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
