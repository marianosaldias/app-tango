import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          _id               : [''],
          firstName         : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
          lastName          : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
          email             : ['', [Validators.required, Validators.email]],
          password          : ['', [Validators.required, Validators.minLength(3)]],
          confirmPassword   : ['', Validators.required],
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    };

    let newUser = new User (
      this.registerForm.value._id,
      this.registerForm.value.firstName, 
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.authService.register(newUser)
      .subscribe(
        res => {
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
          console.log(err.error.message);
          console.log(err.status + ' ' + err.statusText);
        }
      );    
  }  

  // toggle() {
  //   this.show = !this.show;
  // }       

  onReset(form?: FormGroup) {
    if (form) {
      this.submitted = false;
      form.reset();
    }
  }    

}
