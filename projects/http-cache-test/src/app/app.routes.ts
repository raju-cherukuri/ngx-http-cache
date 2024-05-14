import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'games', loadComponent: () => import("./components/games-list/games-list.component").then((m) => m.GamesListComponent)},
  { path: 'products', loadComponent: () => import("./components/products-list/products-list.component").then((m) => m.ProductsListComponent)},
];
