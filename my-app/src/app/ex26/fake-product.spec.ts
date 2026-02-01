import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeProduct } from './fake-product';

describe('FakeProduct', () => {
  let component: FakeProduct;
  let fixture: ComponentFixture<FakeProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
