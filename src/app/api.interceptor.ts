import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        if (req.url.includes('client.nomokoiw.beget.tech') && !req.url.includes('auth.controller.php') && sessionStorage.getItem('userToken')) {
            let u=sessionStorage.getItem('userToken');
            const paramReq = req.clone({
                params: req.params.set('Token', u)
            });
            return next.handle(paramReq);
        } else {
            return next.handle(req);
        }
    }
}
