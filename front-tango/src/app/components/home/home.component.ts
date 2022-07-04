import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit() {
    // this.getLocation();
  }
  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.utils.getCountryAndCity(pos.coords.latitude, pos.coords.longitude)
        .subscribe((res: any) => {
          console.log(res);
          var city = res.results[0].address_components[4].long_name;
          var country = res.results[0].address_components[5].long_name;
          sessionStorage.setItem('CITY', city);
          sessionStorage.setItem('COUNTRY', country);
        });        
      }); 
    }    
  }

}
