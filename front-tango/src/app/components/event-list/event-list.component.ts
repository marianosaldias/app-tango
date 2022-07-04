import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Event } from 'src/app/models/event';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  // subscriptionParam: Subscription;
  // subscriptionProfiles: Subscription;

  inputFilter: string = '';

  event: string = null;
  state: string = null;

  currentPage: number;
  p: number = 1;
  autoHidePaginator: boolean = false;
  totalEvents: number; 
  weHaveResults: boolean;

  constructor(
    private eventService: EventService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.state = this.utils.getState();

    this.route.paramMap.subscribe(params => {
      this.event = params.get("typeOfEvent");
      // this.event = this.utils.capitalizeFirstLetter(this.event.toLowerCase());
      
      if(this.state != null) {
        this.getEventsByEventTypeAndState();
      } else {
        this.getEventsByEventType();
      }
    });
  }

  getEventsByEventType() {
    this.weHaveResults = false;
    this.eventService.getEventsByEventType(this.event)
      .subscribe(res => {
        //this.eventService.profiles = res as Profile[];
        this.eventService.events = <Event[]>res;
        this.totalEvents = this.eventService.events.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }

  getEventsByEventTypeAndState() {
    this.weHaveResults = false;
    this.eventService.events = [];
    this.eventService.getEventsByEventTypeAndState(this.event, this.state)
      .subscribe(res => {
        //this.profileService.profiles = res as Profile[];
        this.eventService.events = <Event[]>res;
        this.totalEvents = this.eventService.events.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }  

  modelFilterChange(inputText: string) {
    this.p = 1;
    this.inputFilter = inputText;
    if(inputText == '') {
      this.autoHidePaginator = true;
    } else {
      this.autoHidePaginator = false;
    }
  }  

  // ngOnDestroy() {
  //   this.subscriptionParam.unsubscribe();
  //   this.subscriptionProfiles.unsubscribe();
  //   this.p = 1;
  // }  

}
