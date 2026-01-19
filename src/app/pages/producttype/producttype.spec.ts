import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Producttype } from './producttype';

describe('Producttype', () => {
  let component: Producttype;
  let fixture: ComponentFixture<Producttype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Producttype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Producttype);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
