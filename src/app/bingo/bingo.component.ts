import { Component, OnInit } from '@angular/core';
import { BingoService } from '../services/bingo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.less']
})
export class BingoComponent implements OnInit {
  
  gameId: number;
  constructor( private bs: BingoService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.gameId = x['id'];
    })
    
  }

}
