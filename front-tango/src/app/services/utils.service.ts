import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  YOUR_API_KEY: string = "AIzaSyCUXdOhyJMeIrjFincV0apuCHD7aI_0JDE";

  state: string;
  languaje: string;

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  getState() {
    this.state = sessionStorage.getItem('COUNTRY');
    return this.state;
  }  

  getLanguaje() {
    this.languaje = localStorage.getItem('languaje');
    return this.languaje;
  }    

  changeLang(lang: string) {
    this.translate.use(lang);
  }  

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getCountryAndCity(lat: number, lng: number) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
    + lat + "," + lng + "&key=" 
    + this.YOUR_API_KEY, 
    { headers: { 'anonymous': 'true' } });
  }

}
