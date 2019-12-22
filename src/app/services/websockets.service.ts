import { Injectable } from "@angular/core";
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class WebsocketService {

  public socket:Rx.Subject<any>;

  constructor() {
    this.socket = <Rx.Subject<any>>this.connect('ws://127.0.0.1:7777').pipe(
    map((response: MessageEvent): any => {
      if(response.data){
        return JSON.parse(response.data);
      }
      return response.data;
    }));
    console.log(this.socket)
  }

  private subject: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}