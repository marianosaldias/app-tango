import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  selectedProfile: Profile;
  profiles: Profile[];
  profile: Profile;
  type: string;

  readonly URL_API = 'http://localhost:3000/api/profiles/';

  constructor(private http: HttpClient) { 
    this.selectedProfile = new Profile();
  }

  // getProfiles() {
  //   return this.http.get(this.URL_API);
  // }

  getProfilesWithIdUser() {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API);
  }  

  getProfileByIdUserProfile(id: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + "iduser/" + `${id}`);
  }  

  getProfilesByProfile(profileFilter: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + `${profileFilter}`);
  }   

  getProfilesByTag(tag: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + 'tag/' + `${tag}`);
  }

  getProfilesByProfileAndState(profile: string, state: string) {
    // return this.http.get(this.URL_API + `${userId}`);
    return this.http.get(this.URL_API + `${profile}` + `/${state}`);
  }     

  postProfile(profile: Profile) {
    console.log(profile);
    return this.http.post(this.URL_API, profile);
  }  

  putProfile(profile: Profile) {
    console.log(profile);
    //return this.http.put(this.URL_API + `/${actor._id}`, actor);
    return this.http.put(this.URL_API + profile._id, profile);
  }    

  deleteProfile(_id: string) {
    return this.http.delete(this.URL_API + `${_id}`);
  }      

}