import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.less']
})
export class ChessComponent implements OnInit {

  gameId: number; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.gameId = x['id'];
    })
  }

}
