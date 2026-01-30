import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19 } from './ex19';

describe('Ex19', () => {
  let component: Ex19;
  let fixture: ComponentFixture<Ex19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
