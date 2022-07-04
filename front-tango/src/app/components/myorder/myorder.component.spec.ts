import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderComponent } from './myorder.component';

describe('MyorderComponent', () => {
  let fixture: ComponentFixture<MyorderComponent>;
  let component: MyorderComponent;
  
  /*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderComponent ]
    })
    .compileComponents();
  }));
  */

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyorderComponent]
    })

    fixture = TestBed.createComponent(MyorderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
