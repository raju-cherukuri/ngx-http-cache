import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GamesListComponent} from "./components/games-list/games-list.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamesListComponent, ProductsListComponent],
  template: `
    <div class="container p-5">
      <router-outlet/>
    </div>`
})
export class AppComponent {}

