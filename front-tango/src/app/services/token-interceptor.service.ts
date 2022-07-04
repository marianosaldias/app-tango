import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // const token: string = sessionStorage.getItem('ACCESS_TOKEN');
    // let request = req;

    // if (token) {
    //   request = req.clone({
    //     setHeaders: {
    //       authorization: `Bearer ${ token }`
    //     }
    //   });
    // }

    // return next.handle(request);


    const token: string = sessionStorage.getItem('ACCESS_TOKEN');

    // if there is Anonymous header, don't handle the request, and remove this flag
    if (req.headers.get('anonymous') == 'true') {
      const newHeaders = req.headers.delete('anonymous')
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest);
    } else {
      var request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
      return next.handle(request);
    }    
  }

}