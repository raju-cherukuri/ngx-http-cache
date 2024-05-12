import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxHttpCacheService } from '../../../ngx-http-cache/src/lib/ngx-http-cache.service';
import {ApiService} from "./services/api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'http-cache-test';
  private readonly ngxHttpCacheService = inject(NgxHttpCacheService);
  private readonly apiService = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  games = signal<any[]>([]);

  ngOnInit(): void {
    console.log(this.ngxHttpCacheService.getTest());

    this.apiService.getGames()
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: response => {
        if (response) {
          this.games.set(response);
        }
      },
      error: err => {
        console.log('ERROR: ', err)
      }
    });
  }
}

