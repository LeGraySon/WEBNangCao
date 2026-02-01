import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex22 } from './ex22';

describe('Ex22', () => {
  let component: Ex22;
  let fixture: ComponentFixture<Ex22>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex22]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex22);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
