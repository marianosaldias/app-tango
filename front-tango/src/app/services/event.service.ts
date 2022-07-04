import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  selectedEvent: Event;
  events: Event[];
  type: string;

  readonly URL_API = 'http://localhost:3000/api/events/';

  constructor(private http: HttpClient) { 
    this.selectedEvent = new Event();
  }

  // getEvents() {
  //   return this.http.get(this.URL_API);
  // }

  getEventsWithIdUser() {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API);
  }  

  getEventById(id: string) {
    // return this.http.get(this.URL_API + `${id}`);
    return this.http.get(this.URL_API + 'idevent/' + `${id}`);
  }   

  getEventsByEventType(eventType: string) {
    // return this.http.get(this.URL_API + `${typeOfEvent}`);
    return this.http.get(this.URL_API + `${eventType}`);
  }    

  getEventsByEventTypeAndState(eventType: string, state: string) {
    // return this.http.get(this.URL_API + `${typeOfEvent}`);
    return this.http.get(this.URL_API + `${eventType}` + `/${state}`);
  }      

  postEvent(event: Event) {
    console.log(event);
    return this.http.post(this.URL_API, event);
  }  

  putEvent(event: Event) {
    console.log(event);
    //return this.http.put(this.URL_API + `/${event._id}`, event);
    return this.http.put(this.URL_API + event._id, event);
  }    

  deleteEvent(_id: string) {
    return this.http.delete(this.URL_API + `${_id}`);
  }      

}