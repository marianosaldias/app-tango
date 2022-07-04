import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProfileService } from 'src/app/services/profile.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  id: string;
  resProfile: Profile;
  weHaveResults: boolean;

  constructor(
    private profileService: ProfileService,
    private utils: UtilsService,
    private location: Location,
    private route: ActivatedRoute    
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      // this.profileType = this.utils.capitalizeFirstLetter(this.profileType.toLowerCase());
    });
    this.getProfileById(this.id);    
  }

  getProfileById(id: string) {
    this.weHaveResults = false;
    this.profileService.getProfileByIdUserProfile(id)
      .subscribe(res => {
        // this.resProfile = res as Profile;
        this.resProfile = <Profile>res;
        console.log(this.resProfile);
        this.weHaveResults = true;
      });
  }    

  goBack() {
    this.location.back();
  }    

}
