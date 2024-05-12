import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      headers: req.headers.set('X-Custom-Header', 'Custom-Value')
    });

    return next.handle(modifiedRequest).pipe(
      finalize(() => {
        console.log('Interceptor: Request completed');
      }),
      catchError(error => {
        console.error(`Interceptor: Error occurred: ${error.status} ${error.statusText}`);
        return throwError(error);
      })
    );
  }
}
