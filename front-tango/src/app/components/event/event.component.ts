import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';  

import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

    editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        //['bold', 'italic'],
        ['fontSize', 'insertImage', 'textColor', 'backgroundColor', 'customClasses', 'fontName', 'link',
        'unlink', 'undo', 'redo', 'toggleEditorMode', 'heading']
      ]
    };

    userId = sessionStorage.getItem('USER_ID');
    eventForm: FormGroup;
    submitted = false;
    show: boolean = false;
    showDaysSelect: boolean = true;
    weHaveResults: boolean;
    registersLenght: number;

    // Map
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;
  
    @ViewChild('search', {static: false})
    public searchElementRef: ElementRef;    
  
    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private formBuilder: FormBuilder, 
      private eventService: EventService
    ) { }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            _id               : [''],
            idUser            : [''],
            state             : ['', Validators.required],
            city              : ['', Validators.required],
            zipCode           : [''],
            addressLat        : [0],
            addressLng        : [0],
            address           : ['', Validators.required],
            addressNumber     : ['', [Validators.required, Validators.pattern('[0-9]*')]],
            eventType         : ['', Validators.required],
            title             : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            phone             : ['', [Validators.required, Validators.pattern('[^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$]*')]],
            email             : ['', [Validators.required, Validators.email]],
            website           : ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
            socialLink        : [''],
            program           : [''],
            organizer         : ['', Validators.required],
            typeDate          : [0],
            eventDay          : [0],
            dateInit          : [''],
            dateEnd           : [''],
            timeInit          : ['', Validators.required],
            timeEnd           : ['', Validators.required]
        });

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          this.geoCoder = new google.maps.Geocoder;

          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();

              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }

              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
              this.getAddress(this.latitude, this.longitude);
            });
          });
        });  

        this.getEventsWithIdUser();

    }

    // convenience getter for easy access to form fields
    get f() { return this.eventForm.controls; }

    // getProfiles() {
    //   this.profileService.getProfiles()
    //     .subscribe(res => {
    //       //this.profileService.profiles = res as Profile[];
    //       this.profileService.profiles = <Profile[]>res
    //     });
    // }

    getEventsWithIdUser() {
      this.weHaveResults = false;
      // const userId = localStorage.getItem('userId');
      this.eventService.getEventsWithIdUser()
        .subscribe(res => {
          //this.profileService.profiles = res as Profile[];
          this.eventService.events = <Event[]>res;
          this.weHaveResults = true;
          this.registersLenght = this.eventService.events.length;
        });
    }

    editEvent(event: Event) {
      this.show = true;
      this.eventService.selectedEvent = event;

      this.eventForm.get('_id').setValue(event._id);
      this.eventForm.get('idUser').setValue(this.userId);
      this.eventForm.get('state').setValue(event.state);
      this.eventForm.get('city').setValue(event.city);
      this.eventForm.get('zipCode').setValue(event.zipCode);
      this.eventForm.get('addressLat').setValue(event.addressLat);
      this.eventForm.get('addressLng').setValue(event.addressLng);
      this.eventForm.get('eventType').setValue(event.eventType);
      this.eventForm.get('title').setValue(event.title);
      this.eventForm.get('address').setValue(event.address);
      this.eventForm.get('addressNumber').setValue(event.addressNumber);
      this.eventForm.get('phone').setValue(event.phone);
      this.eventForm.get('email').setValue(event.email);
      this.eventForm.get('website').setValue(event.website);
      this.eventForm.get('socialLink').setValue(event.socialLink);
      this.eventForm.get('program').setValue(event.program);
      this.eventForm.get('organizer').setValue(event.organizer);
      this.eventForm.get('typeDate').setValue(event.typeDate);
      this.eventForm.get('eventDay').setValue(event.eventDay);
      this.eventForm.get('dateInit').setValue(event.dateInit);
      this.eventForm.get('dateEnd').setValue(event.dateEnd);
      this.eventForm.get('timeInit').setValue(event.timeInit);
      this.eventForm.get('timeEnd').setValue(event.timeEnd);

      if (event.typeDate == 1) {
        this.showDaysSelect = true
      } else {
        this.showDaysSelect = false
      }

      this.latitude = event.addressLat;
      this.longitude = event.addressLng;
      this.getAddress(this.latitude, this.longitude);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.eventForm.value, null, 4));
    }

    deleteEvent(_id: string) {
      this.eventService.deleteEvent(_id)
        .subscribe(res => {
          this.getEventsWithIdUser();
          this.onReset();
        })
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.f);

        if (this.eventForm.invalid) {
            return;
        };

        let newEvent = new Event (
          this.eventForm.value._id,
          this.eventForm.value.idUser,
          this.eventForm.value.state,
          this.eventForm.value.city,
          this.eventForm.value.zipCode,
          this.eventForm.value.addressLat,
          this.eventForm.value.addressLng,
          this.eventForm.value.eventType,
          this.eventForm.value.title,
          this.eventForm.value.address,
          this.eventForm.value.addressNumber,
          this.eventForm.value.phone,
          this.eventForm.value.email,
          this.eventForm.value.website,
          this.eventForm.value.socialLink,
          this.eventForm.value.program,
          this.eventForm.value.organizer,
          this.eventForm.value.typeDate,
          this.eventForm.value.eventDay,
          this.eventForm.value.dateInit,
          this.eventForm.value.dateEnd,
          this.eventForm.value.timeInit,
          this.eventForm.value.timeEnd
        );

        console.log(newEvent);

        if(newEvent._id) {
          this.eventService.putEvent(newEvent)
            .subscribe(res => {
              this.onReset();
              this.getEventsWithIdUser();
            });
        } else {
          this.eventService.postEvent(newEvent)
          .subscribe(res => {
            this.onReset();
            this.getEventsWithIdUser();
          });
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.eventForm.value, null, 4));
    }

    toggle() {
      this.show = !this.show;
    }       

    checkDateType(type: number) {
      if (type == 1) {
        this.showDaysSelect = true
      } else if (type == 2) {
        this.showDaysSelect = false
      }
      this.eventForm.get('typeDate').setValue(type);
    }

    // onReset(form?: FormGroup) {
    //   if (form) {
    //     this.submitted = false;
    //     form.reset();
    //     this.eventService.selectedEvent = new Event();
    //   }
    // }    

    onReset() {
      this.submitted = false;
      this.eventForm.reset();
      this.eventService.selectedEvent = new Event();
    }    

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
    }

    markerDragEnd($event: any) {
      console.log($event);
      // this.latitude = $event.coords.lat;
      // this.longitude = $event.coords.lng;
      this.latitude = $event.latLng.lat();
      this.longitude = $event.latLng.lng();
      this.getAddress(this.latitude, this.longitude);
    }

    onChooseLocation($event: any) {
      this.latitude = $event.latLng.lat();
      this.longitude = $event.latLng.lng();
      this.getAddress(this.latitude, this.longitude);
    }  

    getAddress(latitude: number, longitude: number) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
            
            // Set form values
            this.eventForm.get('state').setValue(results[0].address_components[5].long_name);
            this.eventForm.get('city').setValue(results[0].address_components[4].long_name);
            this.eventForm.get('zipCode').setValue(results[0].address_components[6].long_name);
            this.eventForm.get('addressLat').setValue(this.latitude);
            this.eventForm.get('addressLng').setValue(this.longitude);
            this.eventForm.get('address').setValue(results[0].address_components[1].long_name);
            this.eventForm.get('addressNumber').setValue(results[0].address_components[0].long_name);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  

}

