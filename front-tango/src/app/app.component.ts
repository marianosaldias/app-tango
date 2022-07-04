import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// import { AuthService } from './services/auth.service';
// import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-command';
  langs: string[] = [];
  userName: string;

  constructor(
    private translate: TranslateService
    // private utils: UtilsService,
    // private authService: AuthService
  ) {
      this.userName = sessionStorage.getItem('USER_NAME');
      
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.translate.addLangs(['en', 'es']);

      localStorage.setItem('languaje', 'en')
      
      this.langs = this.translate.getLangs();

      // <label>
      //   Change languaje
      //   <select #langSelect (change)="changeLang(langSelect.value)">
      //       <option *ngFor="let lang of langs" [value]="lang">
      //     {{ lang }}
      //     </option>
      //   </select>
      // </label>

      // Importante!!! en cada componente,
      // import { TranslateModule } from '@ngx-translate/core';
    }

}
