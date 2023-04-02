import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListByCategoryNameComponent } from './product-list-by-category-name.component';

describe('ProductListByCategoryNameComponent', () => {
  let component: ProductListByCategoryNameComponent;
  let fixture: ComponentFixture<ProductListByCategoryNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListByCategoryNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListByCategoryNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
