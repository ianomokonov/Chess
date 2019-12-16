import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BingoService{
    userId: number;

    private readonly baseURL = 'http://localhost/chess/bingoController.php';
    constructor( private http: HttpClient ){}

    step(step){
        return this.http.post(this.baseURL + '?Key=step', step);
    }

    getGame(id: number){
        return this.http.get<any>(this.baseURL + '?Key=get-game&Id='+id);
    }

    createGame(game){
        return this.http.post<number>(this.baseURL + '?Key=create-game', game);
    }
}