import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListByProfileComponent } from './profile-list-by-profile.component';

describe('ProfileListByProfileComponent', () => {
  let component: ProfileListByProfileComponent;
  let fixture: ComponentFixture<ProfileListByProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListByProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListByProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
