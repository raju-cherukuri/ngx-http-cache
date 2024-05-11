import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxHttpCacheService } from '../../../ngx-http-cache/src/lib/ngx-http-cache.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'http-cache-test';
  ngxHttpCacheService = inject(NgxHttpCacheService);

  ngOnInit(): void {
    console.log(this.ngxHttpCacheService.getTest());
  }
}
