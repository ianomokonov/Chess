import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BingoService{
    userId: number;

    private readonly baseURL = 'http://localhost/chess/gameController.php';
    constructor( private http: HttpClient ){}

    getGame(id: number){
        return this.http.get<any>(this.baseURL + '?Key=get-game&Id='+id);
    }

    createGame(game){
        return this.http.post(this.baseURL + '?Key=add-game', game);
    }

    joinGame(player){
        return this.http.post(this.baseURL + '?Key=join-game', player);
    }

    addCard(card){
        return this.http.post(this.baseURL + '?Key=add-card', card);
    }

    addCells(cells){
        return this.http.post(this.baseURL + '?Key=add-cells', cells);
    }

    getCard(id: number){
        return this.http.get<any>(this.baseURL + '?Key=get-card&Id='+id);
    }
}