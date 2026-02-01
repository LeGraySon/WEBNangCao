import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeProduct27 } from './fake-product27';

describe('FakeProduct27', () => {
  let component: FakeProduct27;
  let fixture: ComponentFixture<FakeProduct27>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeProduct27]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeProduct27);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
