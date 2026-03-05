import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionAPIService } from './fashion-apiservice';

describe('FashionAPIService', () => {
  let component: FashionAPIService;
  let fixture: ComponentFixture<FashionAPIService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FashionAPIService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionAPIService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
