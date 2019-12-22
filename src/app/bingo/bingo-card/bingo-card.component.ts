import { Component, OnInit, Input } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';
import { WebsocketService } from 'src/app/services/websockets.service';

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
  constructor( private bs: BingoService, private ws: WebsocketService ) { }

  ngOnInit() {
    this.ws.socket.subscribe(x => {
      if(x && x.key){
        switch(x.key){
          case 'bingo-step': {
            this.choosedIndexes.push(x.position);
          }
        }
      }
    })
  }

  choose(index: number){
    if(this.current === this.numbers[index]){
     this.ws.socket.next({key: 'bingo-step', cardId: this.cardId, position: index});
      
    }
    
  }

}
