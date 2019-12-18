import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    private readonly baseURL = 'http://localhost/auth.php';

    constructor( private http: HttpClient, private router: Router){}

    enter(email, password){
        const params = new HttpParams();
        params.set('Email', email).set('Password', password);
        return this.http.get<string>(`${this.baseURL}?Key=enter`, {params: params}).pipe(
            tap(token => {
                sessionStorage.setItem('userToken', token);
            })
        );
    }

    registrate(user){
        return this.http.post<string>(`${this.baseURL}?Key=add-user`, user).pipe(
            tap(token => {
                sessionStorage.setItem('userToken', token);
            })
        );
    }

    exit(){
        sessionStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }
}