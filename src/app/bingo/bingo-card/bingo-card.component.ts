import { Component, OnInit, Input } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.less']
})
export class BingoCardComponent implements OnInit {
  @Input() numbers: number[];
  @Input() cardId: number;
  @Input() current: number;
  choosedIndexes: number[] = [];
  constructor( private bs: BingoService ) { }

  ngOnInit() {

  }

  choose(index: number){
    if(this.current === this.numbers[index]){
      this.bs.step({cardId: this.cardId, index: index, value: this.current}).subscribe(x => {
        this.choosedIndexes.push(index);
      },
      ()=> {
        console.error('Ход не синхронизирован!')
        this.choosedIndexes.push(index);
      })
      
    }
    
  }

}
