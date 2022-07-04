import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { DataTableModule } from "angular-6-datatable";
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularPaginatorModule } from 'angular-paginator';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CommanderComponent } from './components/commander/commander.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventComponent } from './components/event/event.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { ByProfileComponent } from './components/getprofiles/by-profile/by-profile.component';
import { ProfileListByProfileComponent } from './components/profile-list-by-profile/profile-list-by-profile.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'commander', component: CommanderComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  // actors protected
  { path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'blogs', component: BlogComponent, canActivate: [AuthGuard] },  
  { path: 'requestPassword', component: RequestPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: "profiles/:profile", component: ProfileListByProfileComponent },
  { path: "profiles/tag/:tag", component: ProfileListByProfileComponent },  
  { path: "profiles/id/:id", component: ProfileDetailComponent },
  { path: "events/:typeOfEvent", component: EventListComponent },
  { path: "events/id/:id", component: EventDetailComponent },
  { path: "bloglist", component: BlogListComponent },
  { path: "bloglist/tag/:tag", component: BlogListComponent },
  { path: "blog/id/:id", component: BlogDetailComponent },
  
  // Aca estoy protegiendo una ruta:
  //{path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  //Tambien tengo que protegerla desde el Back!!!
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CommanderComponent,
    AboutusComponent,
    ProfileComponent,  
    EventComponent,    
    RegisterComponent,
    LoginComponent,
    MessageBoxComponent,
    RequestPasswordComponent,
    ContactComponent,
    ByProfileComponent,
    ProfileListByProfileComponent,
    ProfileDetailComponent,
    BlogComponent,
    EventListComponent,
    EventDetailComponent,
    BlogListComponent,
    LoaderComponent,
    BlogDetailComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    Ng2SearchPipeModule,
    AngularPaginatorModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUXdOhyJMeIrjFincV0apuCHD7aI_0JDE',
      libraries: ['places']
    }),    
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {enableTracing : false}
    )
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
