import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bingo-field',
  templateUrl: './bingo-field.component.html',
  styleUrls: ['./bingo-field.component.less']
})
export class BingoFieldComponent implements OnInit {
  cards = [];
  numbers = [];
  currentNumber = 55;
  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 9; i++){
      let row = [];
      for(let j = 0; j < 10; j++){
        if(i == 0 && j == 0){
          continue;
        }
        row.push(i*10 + j);

      }
      this.numbers.push(row)
    }
    this.numbers[8].push(90);
    this.genCards()
    
  }

  genCards() {
    for(let i = 0; i< 4; i++){
      const nums = JSON.parse(JSON.stringify(this.numbers));
      let card = [];
      for(let j = 0; j<27; j+=3){
        console.log(j)
        const number = j/3;
        let index = this.randomInteger(0, nums[number].length);
        card.push(nums[number][index]);
        nums[number].splice(index, 1);
        index = this.randomInteger(0, nums[number].length);
        card.push(nums[number][index]);
        nums[number].splice(index, 1);
        console.log(!card[j] && !card[j+1])
        index = !card[j] && !card[j+1] ? 
          this.randomInteger(0, nums[number].length, false) : this.randomInteger(0, nums[number].length, false);
        card.push(nums[number][index]);
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
    this.currentNumber = this.randomInteger(1,90, false);
  }
}
