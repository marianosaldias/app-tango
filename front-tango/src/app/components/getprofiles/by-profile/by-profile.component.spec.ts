import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByProfileComponent } from './by-profile.component';

describe('ByProfileComponent', () => {
  let component: ByProfileComponent;
  let fixture: ComponentFixture<ByProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
