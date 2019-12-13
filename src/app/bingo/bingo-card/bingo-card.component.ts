import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.less']
})
export class BingoCardComponent implements OnInit {
  @Input() numbers: number[];
  @Input() current: number;
  choosedIndexes: number[] = [];
  constructor() { }

  ngOnInit() {

  }

  choose(index: number){
    if(this.current === this.numbers[index]){
      this.choosedIndexes.push(index);
    }
    
  }

}
