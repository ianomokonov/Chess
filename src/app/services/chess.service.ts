import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChessService{
    userId: number;
    white: boolean = true;
    private readonly baseURL = 'http://localhost/chess/gameController.php';
    constructor( private http: HttpClient ){}

    addStep(step){
        return this.http.post(this.baseURL + '?Key=add-step', step);
    }

    addGame(game){
        return this.http.post(this.baseURL + '?Key=add-game', game);
    }

    getGame(id: number){
        return this.http.get<any>(this.baseURL + '?Key=get-game&Id='+id);
    }

    getGameSteps(id: number){
        return this.http.get<any>(this.baseURL + '?Key=get-step&Id='+id);
    }

    createGame(game){
        return this.http.post(this.baseURL + '?Key=add-game', game);
    }

    joinGame(player){
        return this.http.post(this.baseURL + '?Key=join-game', player);
    }
}