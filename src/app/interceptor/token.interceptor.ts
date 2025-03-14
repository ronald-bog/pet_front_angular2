import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const protect = ['catalog', 'verif', 'types'];
    const sessionToken = sessionStorage.getItem('session');

    if (sessionToken && protect.some(point => req.url.includes(point))) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${sessionToken}` } });
    } else if (!sessionToken && protect.some(point => req.url.includes(point))) {
      this.router.navigate(['']);
    }

    return next.handle(req);
  }
}
