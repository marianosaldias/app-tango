import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() usr: string;
  userName: string;
  userNameSubscription: Subscription;
  languaje: string = localStorage.getItem('languaje');

  constructor(
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
    ) { }  

  ngOnInit() {
    this.userName = sessionStorage.getItem('USER_NAME');

    this.userNameSubscription = this.authService.usrName.subscribe(data => {
      this.userName = data
    });

    if (this.usr) {
      this.userName = this.usr;
    }
  }

  ngOnChanges() {
    this.userNameSubscription = this.authService.usrName.subscribe(data => {
      this.userName = data;
    });    
  }

  ngOnDestroy() {
    this.userNameSubscription.unsubscribe();
  }  

  signOut() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  changeLang(lang: string) {
    this.utils.changeLang(lang);
    localStorage.setItem('languaje', lang);
    this.languaje = lang;

  }

}
