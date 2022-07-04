import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProfileService } from 'src/app/services/profile.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Profile } from 'src/app/models/profile';


@Component({
  selector: 'app-by-profile',
  templateUrl: './by-profile.component.html',
  styleUrls: ['./by-profile.component.css']
})
export class ByProfileComponent implements OnInit {

  // profileFilter: 'Master' || 'Artist' || 'Orchestra' || 'Dj' || 'DanceRoom' || 'School'
  @Input() profileFilter: string;
  
  inputFilter: string = '';
  state: string = null;

  p: number = 1;
  totalProfiles: number;
  autoHidePaginator: boolean = false;
  weHaveResults: boolean;

  constructor(
    private profileService: ProfileService, 
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.state = this.utils.getState();

    if(this.state != null) {
      this.getProfilesByProfileAndState();
    } else {
      this.getProfilesByProfile();
    }
  }

  getProfilesByProfile() {
    this.weHaveResults = false;
    this.profileService.getProfilesByProfile(this.profileFilter)
      .subscribe(res => {
        //this.profileService.profiles = res as Profile[];
        this.profileService.profiles = <Profile[]>res;
        this.totalProfiles = this.profileService.profiles.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }

  getProfilesByProfileAndState() {
    this.weHaveResults = false;
    this.state = this.utils.getState();
    this.profileService.getProfilesByProfileAndState(this.profileFilter, this.state)
      .subscribe(res => {
        //this.profileService.profiles = res as Profile[];
        this.profileService.profiles = <Profile[]>res;
        this.totalProfiles = this.profileService.profiles.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }  

  modelFilterChange(inputText: string) {
    this.p = 1;
    // Necesito esto???
    // this.inputFilter = inputText;
    if(inputText == '') {
      this.autoHidePaginator = true;
    } else {
      this.autoHidePaginator = false;
    }
  }

}

// How to use it?
// <app-by-profile 
//    [profileFilter]="'Orchestra'">
// </app-by-profile>

