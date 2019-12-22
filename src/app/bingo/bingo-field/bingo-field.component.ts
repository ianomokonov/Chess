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
    this.ws.socket.pipe(
      filter(vl => vl)
     ).subscribe(x => {
       console.log(x);
       if(x.Cards){
        if(x.Cards.filter(c => c.PlayerId == this.playerId).length<2){
          if(this.quariesCount < 2){
            this.ws.socket.next({key:'add-card', value: {GameId: this.gameId, PlayerId: this.playerId, numbers: this.genCard() }});
          }
          this.quariesCount++;
        }else{
          this.cards = x.Cards.filter(c => c.PlayerId != this.playerId).map(c => {
            return +c.Value;
          });
          this.myCards = x.Cards.filter(c => c.PlayerId == this.playerId).map(c => {
            c.Cells = c.Cells.map(s => s.Value ? +s.Value : null);
            return c;
          });
          this.next();
        }
        
       }
      

     
      
    });
    setTimeout(x => {
      this.ws.socket.next({key: 'get-game', id: this.gameId});
    }, 100);
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

  genCard() {
      const nums = JSON.parse(JSON.stringify(this.numbers));
      let numbers = [];
      for(let j = 0; j<27; j+=3){
        const number = j/3;
        let index = this.randomInteger(0, nums[number].length-1);
        numbers.push({Position: j+1, Value: nums[number][index]});
        nums[number].splice(index, 1);
        index = this.randomInteger(0, nums[number].length-1);
        numbers.push({Position: j+2, Value: nums[number][index]});
        nums[number].splice(index, 1);
        index = !numbers[j] && !numbers[j+1] ? 
          this.randomInteger(0, nums[number].length-1, false) : this.randomInteger(0, nums[number].length-1, false);
        numbers.push({Position: j+3, Value: nums[number][index]});
        nums[number].splice(index, 1);

      }
      return numbers;
  }
  
  randomInteger(min, max, withEmpty = true) {

    let m = withEmpty ? max + 10 : max;
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (m - min + 1);
    const res = Math.round(rand);
    return res > max ? null : res;
  }

  next(){
    if(this.barrelNumbers.length > 0){
      const index = this.randomInteger(0,this.barrelNumbers.length-1, false);
      this.currentNumber = this.barrelNumbers[index];
      this.barrelNumbers.splice(index, 1);
    }else{
      alert('The end!')
    }
    
  }
}
