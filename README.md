# NgxHttpCache

NgxHttpCache is a utility library for Angular that provides caching functionality. It uses the power of IndexDB to store and retrieve the data.

![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)
![GitHub Repo stars](https://img.shields.io/github/stars/raju/ngx-multilingual)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/raju/ngx-multilingual/main)


## Usage

### 1. Install

```
npm install ngx-http-cache --save --dev
```

### 2. Service Integration

Integrate NgxHttpCacheService into your Angular application:

```typescript
import { Injectable } from '@angular/core';
import { IndexedDBUtil } from './IndexedDBUtil';

@Injectable({
  providedIn: 'root'
})
export class NgxHttpCacheService<T> {
  private util = new IndexedDBUtil<T>();

  async setStore(objectStoreName: string, keyPath: string, expiryTime: number): Promise<void> {
    this.util.setObjectStoreName(objectStoreName, keyPath, expiryTime).then();
  }

  getAll(): Promise<T[]> {
    return this.util.getAll();
  }

  addItems(payload: T[]): void {
    this.util.addItems(payload);
  }

  addItem(item: T): void {
    this.util.addItem(item);
  }

  getItem(id: number): void {
    this.util.getItem(id);
  }

  delete(id: number): void {
    this.util.delete(id);
  }

  update(item: T): void {
    this.util.update(item);
  }
}


```

### consuming the library to your application

```typescript
import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NgxHttpCacheService} from "../../../../../ngx-http-cache/src/lib/ngx-http-cache.service";
import {ApiService} from "../../services/api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Product} from "../../models/product";
import {ProductComponent} from "./product.component";
import {RouterLink} from "@angular/router";
import {EXPIRY_TIME} from "../games-list/games-list.component";

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    ProductComponent,
    RouterLink
  ],
  template: `
    @defer () {
      <div class="bg-body-tertiary border border-1 border-primary rounded d-flex justify-content-between">
        <h2 class="text-primary m-2">Product List</h2>
        <a class="btn btn-outline-primary m-2" routerLink="/games">Games</a>
      </div>
      <div class="row">
        <button class="btn btn-outline-primary m-2" (click)="addProduct()">Add Product</button>
        @for (product of products(); track product.id) {
          <div class="col-md-4">
            <product [product]="product"/>
          </div>
        }
      </div>
    } @loading () {
      <h4>loading...</h4>
    }`,
  styles: ``
})
export class ProductsListComponent implements OnInit {
  private readonly ngxHttpCacheService = inject(NgxHttpCacheService);
  private readonly apiService = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.setStore();
    this.getCache();
  }

  async setStore() {
    await this.ngxHttpCacheService.setStore('products', 'id', EXPIRY_TIME);
  }

  getCache(): void {
    this.ngxHttpCacheService.getAll().then((products) => {
      if (products.length === 0) {
        this.getProducts();
      } else {
        this.products.set(products);
      }
    });
  }

  getProducts() {
    this.apiService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: response => {
        if (response) {
          this.products.set(response);
          this.setStore();
          this.ngxHttpCacheService.addItems(this.products());
        }
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    });
  }

  addProduct() {
    const item =
      {id: 3332, title: 'TEST 2', discountedPrice: 55.99, price: 49.95, quantity: 100}
    this.ngxHttpCacheService.addItem(item);
  }
}

```

The NgxHttpCacheService class is a service in your library that provides a high-level API for interacting with IndexedDB. It uses the IndexedDBUtil class to perform operations on the database. Here’s a more detailed description of the NgxHttpCacheService class and its methods:

* **util**: This private property holds an instance of the IndexedDBUtil class. It’s used internally by the service to perform operations on the database.
* **setStore(objectStoreName**: string, keyPath: string, expiryTime: number): This asynchronous method sets the object store name and key path, and the expiry time for the database. It calls the setObjectStoreName method of the IndexedDBUtil instance.
* **getAll()**: This method retrieves all items from the object store. It returns a promise that resolves with the items. It calls the getAll method of the IndexedDBUtil instance.
* **addItems(payload: T[])**: This method adds multiple items to the object store. It calls the addItems method of the IndexedDBUtil instance.
* **addItem(item: T)**: This method adds a single item to the object store. It calls the addItem method of the IndexedDBUtil instance.
* **getItem(id: number)**: This method retrieves an item from the object store by its id. It calls the getItem method of the IndexedDBUtil instance.
* **delete(id: number)**: This method deletes an item from the object store by its id. It calls the delete method of the IndexedDBUtil instance.
* **update(item: T)**: This method updates an item in the object store. It calls the update method of the IndexedDBUtil instance.

The NgxHttpCacheService class is decorated with the @Injectable decorator, which means it can be provided and injected as a dependency in other parts of your Angular application. The { providedIn: 'root' } configuration means that the service is provided in the root injector and is available throughout the app.

This service provides a convenient way to interact with IndexedDB by abstracting away some of the complexities of the IndexedDB API. It can be used to store, retrieve, update, and delete items in the database. The generic parameter T allows you to use this service with any type of data that you want to store in the database.

In summary, your library provides a set of tools for managing data in IndexedDB, making it easier for developers to use this powerful browser API. It includes features for setting up the database and object stores, checking for expiry, and performing CRUD operations. It’s a useful tool for any web application that needs to handle large amounts of data locally.


## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/raju/ngx-translatekit/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/raju/ngx-translatekit/blob/main/LICENSE) file for the full text)
