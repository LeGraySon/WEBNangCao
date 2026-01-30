import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProduct } from './service-product';

describe('ServiceProduct', () => {
  let component: ServiceProduct;
  let fixture: ComponentFixture<ServiceProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
