import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHttpCacheComponent } from './ngx-http-cache.component';

describe('NgxHttpCacheComponent', () => {
  let component: NgxHttpCacheComponent;
  let fixture: ComponentFixture<NgxHttpCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxHttpCacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxHttpCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
