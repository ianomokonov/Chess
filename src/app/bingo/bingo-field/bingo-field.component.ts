import { Component, OnInit, Input } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'bingo-field',
  templateUrl: './bingo-field.component.html',
  styleUrls: ['./bingo-field.component.less']
})
export class BingoFieldComponent implements OnInit {

  @Input() gameId: number;
  cards = [];
  numbers = [];
  barrelNumbers = [];
  currentNumber = null;
  constructor( private bs: BingoService) { }

  ngOnInit() {
    this.bs.getGame(this.gameId).subscribe( game => {
      this.cards = game.cards;
      for( let i = 1; i < 91; i++){
        if(game.numbers.indexOf(i)<0){
          this.barrelNumbers.push(i);
        }
      }
      this.next();
    },
    () => {
      console.error('Игра не загружена!')
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
      this.genCards()
      this.next();
    })
    
    
  }

  genCards() {
    for(let i = 0; i< 4; i++){
      const nums = JSON.parse(JSON.stringify(this.numbers));
      let card = {
        id: i + 1,
        numbers: []
      };
      for(let j = 0; j<27; j+=3){
        const number = j/3;
        let index = this.randomInteger(0, nums[number].length-1);
        card.numbers.push(nums[number][index]);
        nums[number].splice(index, 1);
        index = this.randomInteger(0, nums[number].length-1);
        card.numbers.push(nums[number][index]);
        nums[number].splice(index, 1);
        index = !card[j] && !card[j+1] ? 
          this.randomInteger(0, nums[number].length-1, false) : this.randomInteger(0, nums[number].length-1, false);
        card.numbers.push(nums[number][index]);
        nums[number].splice(index, 1);

      }
      this.cards.push(card);
    }
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
