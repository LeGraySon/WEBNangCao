import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ptb } from './ptb';

describe('Ptb', () => {
  let component: Ptb;
  let fixture: ComponentFixture<Ptb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ptb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ptb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
