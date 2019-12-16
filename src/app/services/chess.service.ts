import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChessService{
    userId: number;
    white: boolean = true;
    private readonly baseURL = 'http://localhost/chess/chessController.php';
    constructor( private http: HttpClient ){}

    step(step){
        return this.http.post(this.baseURL + '?Key=step', step);
    }

    getGame(id: number){
        return this.http.get(this.baseURL + '?Key=getGame&Id='+id);
    }

    createGame(game){
        return this.http.post<number>(this.baseURL + '?Key=createGame', game);
    }
}