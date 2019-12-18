import { Component } from '@angular/core';
import { WebsocketService } from './services/websockets.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'chess';
  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };
  yes = true;
  constructor(private ws: WebsocketService){
    

    
  }
}
