import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex21 } from './ex21';

describe('Ex21', () => {
  let component: Ex21;
  let fixture: ComponentFixture<Ex21>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex21]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex21);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
