import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs'
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {

  http = inject(HttpClient);

  getGames(): Observable<any[]> {
    return this.http.get<[]>(environment.BASE_URL + '/video-games');
  }

  getProducts(): Observable<any[]> {
    return this.http.get<[]>(environment.BASE_URL + '/products');
  }
}
