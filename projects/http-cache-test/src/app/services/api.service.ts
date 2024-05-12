import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs'

@Injectable({providedIn: 'root'})
export class ApiService {

  BASE_URL = 'https://json-server-eshopke.vercel.app';
  http = inject(HttpClient);

  getGames(): Observable<any[]> {
    return this.http.get<[]>(this.BASE_URL + '/video-games');
  }
}
