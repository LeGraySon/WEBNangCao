import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learnbinding } from './learnbinding';

describe('Learnbinding', () => {
  let component: Learnbinding;
  let fixture: ComponentFixture<Learnbinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Learnbinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Learnbinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
