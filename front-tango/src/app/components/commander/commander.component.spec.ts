import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanderComponent } from './commander.component';
import { By } from '@angular/platform-browser';


fdescribe('CommanderComponent', () => {
  let component: CommanderComponent;
  let fixture: ComponentFixture<CommanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should shows: ad laborum at h1', () => {
    const numberOfEl = fixture.debugElement.queryAll(By.css('ul#dash li')).length;
    const numberOfActive = fixture.debugElement.queryAll(By.css('ul#dash li.active')).length;
    const h2 = fixture.nativeElement.querySelector('h2').textContent;

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('ab laborum');
    expect(numberOfEl).toEqual(4);
    expect(numberOfActive).toEqual(1);
    expect(h2).toContain('Principios para una');
  });  

});
