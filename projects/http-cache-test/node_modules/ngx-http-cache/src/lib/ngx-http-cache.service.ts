import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxHttpCacheService {

  constructor() { }

  getTest(){
    return 'HELLO TEST';
  }
}
