import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Idname } from './idname';

describe('Idname', () => {
  let component: Idname;
  let fixture: ComponentFixture<Idname>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Idname]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Idname);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
