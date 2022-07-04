import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from 'src/app/services/profile.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Profile } from 'src/app/models/profile';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-list-by-profile',
  templateUrl: './profile-list-by-profile.component.html',
  styleUrls: ['./profile-list-by-profile.component.css']
})
export class ProfileListByProfileComponent implements OnInit {

  // subscriptionParam: Subscription;
  // subscriptionProfiles: Subscription;

  inputFilter: string = '';

  profile: string = null;
  state: string = null;
  tag: string = null;

  currentPage: number;
  p: number = 1;
  autoHidePaginator: boolean = false;
  totalProfiles: number;
  weHaveResults: boolean;

  constructor(
    private profileService: ProfileService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.state = this.utils.getState();

    this.route.paramMap.subscribe(params => {
      this.tag = params.get("tag");
      // this.tag = this.utils.capitalizeFirstLetter(this.tag.toLowerCase());
      if (this.tag) {
          this.getProfilesByTag(this.tag);
      } else {
        this.profile = params.get("profile");
        this.profile = this.utils.capitalizeFirstLetter(this.profile.toLowerCase());
        this.getProfilesByProfile();
      }
    });
  }

  getProfilesByProfile() {
    this.weHaveResults = false;
    this.profileService.getProfilesByProfile(this.profile)
      .subscribe(res => {
        //this.profileService.profiles = res as Profile[];
        this.profileService.profiles = <Profile[]>res;
        this.totalProfiles = this.profileService.profiles.length;
        this.p = 1;
        this.weHaveResults = true;
      });
  }

  getProfilesByTag(tag: string) {
    this.weHaveResults = false;
    this.tag = tag;
    this.profileService.getProfilesByTag(tag)
      .subscribe(res => {
        //this.blogService.blogss = res as Blog[];
        this.profileService.profiles = <Profile[]>res;
        this.totalProfiles = this.profileService.profiles.length;
        this.p = 1;
        this.weHaveResults = true;
      });  
  }

  getProfilesByProfileAndState() {
    this.profileService.profiles = [];
    this.profileService.getProfilesByProfileAndState(this.profile, this.state)
      .subscribe(res => {
        //this.profileService.profiles = res as Profile[];
        this.profileService.profiles = <Profile[]>res;
        this.totalProfiles = this.profileService.profiles.length;
        this.p = 1;
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
