import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '100px',
      // maxHeight: 'auto',
      // width: 'auto',
      // minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Roboto',
      defaultFontSize: '16',
      // fonts: [
      //   {class: 'arial', name: 'Arial'},
      //   {class: 'times-new-roman', name: 'Times New Roman'},
      //   {class: 'calibri', name: 'Calibri'},
      //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      // ],
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
    profileForm: FormGroup;
    submitted = false;
    show: boolean = false;
    weHaveResults: boolean;
    registersLenght: number;

    constructor(
      private formBuilder: FormBuilder, 
      private profileService: ProfileService
    ) { }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            _id               : [''],
            idUser            : [''],
            state             : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            city              : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            profile           : ['', Validators.required],
            name              : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            subtitle          : ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
            phone             : ['', [Validators.required, Validators.pattern('[^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$]*')]],
            email             : ['', [Validators.required, Validators.email]],
            website           : ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
            socialLink        : [''],
            resume            : [''],
            tags              : ['', Validators.required]
        });

        this.getProfilesWithIdUser();
    }

    // convenience getter for easy access to form fields
    get f() { return this.profileForm.controls; }

    // getProfiles() {
    //   this.profileService.getProfiles()
    //     .subscribe(res => {
    //       //this.profileService.profiles = res as Profile[];
    //       this.profileService.profiles = <Profile[]>res
    //     });
    // }

    getProfilesWithIdUser() {
      this.weHaveResults = false;
      // const userId = localStorage.getItem('userId');
      this.profileService.getProfilesWithIdUser()
        .subscribe(res => {
          //this.profileService.profiles = res as Profile[];
          this.profileService.profiles = <Profile[]>res;
          this.weHaveResults = true;
          this.registersLenght = this.profileService.profiles.length;
        });
    }

    editProfile(profile: Profile) {
      this.show = true;
      this.profileService.selectedProfile = profile;

      this.profileForm.get('_id').setValue(profile._id);
      this.profileForm.get('idUser').setValue(this.userId);
      this.profileForm.get('state').setValue(profile.state);
      this.profileForm.get('city').setValue(profile.city);
      this.profileForm.get('profile').setValue(profile.profile);
      this.profileForm.get('name').setValue(profile.name);
      this.profileForm.get('subtitle').setValue(profile.subtitle);
      this.profileForm.get('phone').setValue(profile.phone);
      this.profileForm.get('email').setValue(profile.email);
      this.profileForm.get('website').setValue(profile.website);
      this.profileForm.get('socialLink').setValue(profile.socialLink);
      this.profileForm.get('resume').setValue(profile.resume);
      this.profileForm.get('tags').setValue(profile.tags);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value, null, 4));
    }

    deleteProfile(_id: string) {
      this.profileService.deleteProfile(_id)
        .subscribe(res => {
          this.getProfilesWithIdUser();
          this.onReset();
        })
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.f);

        if (this.profileForm.invalid) {
            return;
        };

        let newProfile = new Profile (
          this.profileForm.value._id,
          this.profileForm.value.idUser,
          this.profileForm.value.state,
          this.profileForm.value.city,
          this.profileForm.value.profile,
          this.profileForm.value.name,
          this.profileForm.value.subtitle,
          this.profileForm.value.phone,
          this.profileForm.value.email,
          this.profileForm.value.website,
          this.profileForm.value.socialLink,
          this.profileForm.value.resume,
          this.profileForm.value.tags
        );
        // console.log(newProfile);

        if(newProfile._id) {
          this.profileService.putProfile(newProfile)
            .subscribe(res => {
              this.onReset();
              this.getProfilesWithIdUser();
            });
        } else {
          this.profileService.postProfile(newProfile)
          .subscribe(res => {
            this.onReset();
            this.getProfilesWithIdUser();
          });
        }

        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value, null, 4));
    }

    toggle() {
      this.show = !this.show;
    }       

    // onReset(form?: FormGroup) {
    //   if (form) {
    //     this.submitted = false;
    //     form.reset();
    //     this.profileService.selectedProfile = new Profile();
    //   }
    // }    

    onReset() {
      this.submitted = false;
      this.profileForm.reset();
      this.profileService.selectedProfile = new Profile();
    }    

}

