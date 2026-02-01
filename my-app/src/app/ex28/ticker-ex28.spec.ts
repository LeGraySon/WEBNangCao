import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerEx28 } from './ticker-ex28';

describe('TickerEx28', () => {
  let component: TickerEx28;
  let fixture: ComponentFixture<TickerEx28>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TickerEx28]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerEx28);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
