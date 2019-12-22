import { Component, OnInit, Input } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';
import { WebsocketService } from 'src/app/services/websockets.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bingo-field',
  templateUrl: './bingo-field.component.html',
  styleUrls: ['./bingo-field.component.less']
})
export class BingoFieldComponent implements OnInit {

  @Input() gameId: number;
  cards = [];
  myCards = [];
  numbers = [];
  choosedIndexes: any = {};
  quariesCount = 0;
  barrelNumbers = [];
  playerId = 2;
  currentNumber = null;
  constructor( private ws: WebsocketService) { 
    for(let i = 0; i < 9; i++){
          let row = [];
          for(let j = 0; j < 10; j++){
            if(i == 0 && j == 0){
              continue;
            }
            row.push(i*10 + j);
            this.barrelNumbers.push(i*10 + j);
    
          }
          this.numbers.push(row)
        }
        this.numbers[8].push(90);
        this.barrelNumbers.push(90);
  }

  ngOnInit() {
    this.ws.socket.subscribe(x => {
       console.log(x);
       if(x){
         if(x.Cards){
          x.Cards = x.Cards.map(e => {
            e.Cells = e.Cells.map(c => {
              return c.Value ? +c.Value : null;
            })
            return e;
          });
          this.myCards = x.Cards.filter(c => c.PlayerId == this.playerId);
          this.cards = x.Cards.filter(c => c.PlayerId != this.playerId);
         }
        
        
        if(x.key){
          switch(x.key){
            case 'next':{
              this.currentNumber = this.barrelNumbers[x.value];
              this.barrelNumbers.splice(x.value, 1);
              if(!this.barrelNumbers.length){
                alert('The end!');
              }
              break;
            }
            case 'bingo-step': {
              if(!this.choosedIndexes[`card${x.cardId}`]){
                this.choosedIndexes[`card${x.cardId}`] = [];
              }
              this.choosedIndexes[`card${x.cardId}`].push(x.position);
              console.log(x)
              break;
            }
          }
        }
       }

       if(!this.myCards.length){
        this.ws.socket.next({key:'add-card', value: {GameId: this.gameId, PlayerId: this.playerId }});
       }
    });
    

    setTimeout(x => {
      this.ws.socket.next({key: 'get-game', id: this.gameId});
      this.next();
    }, 100)
    // this.bs.getGame(this.gameId).subscribe( game => {
    //   this.cards = game.cards;
    //   for( let i = 1; i < 91; i++){
    //     if(game.numbers.indexOf(i)<0){
    //       this.barrelNumbers.push(i);
    //     }
    //   }
    //   this.next();
    // },
    // () => {
    //   console.error('Игра не загружена!')
    //   for(let i = 0; i < 9; i++){
    //     let row = [];
    //     for(let j = 0; j < 10; j++){
    //       if(i == 0 && j == 0){
    //         continue;
    //       }
    //       row.push(i*10 + j);
    //       this.barrelNumbers.push(i*10 + j);
  
    //     }
    //     this.numbers.push(row)
    //   }
    //   this.numbers[8].push(90);
    //   this.barrelNumbers.push(90);
    //   this.genCards()
    //   this.next();
    // })
    
    
  }
  
  randomInteger(min, max, withEmpty = true) {

    let m = withEmpty ? max + 10 : max;
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (m - min + 1);
    const res = Math.round(rand);
    return res > max ? null : res;
  }

  next(){
    const index = this.randomInteger(0,this.barrelNumbers.length-1, false);
    this.ws.socket.next({key: 'next', value: index});
  }
}
