import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/userlogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  errObj: {} = {
    status: false, 
    error: {message: ''}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email             : ['', [Validators.required, Validators.email]],
      password          : ['', [Validators.required, Validators.minLength(3)]],
    });    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }  

  onLogin(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    };

    let newUserLogin = new UserLogin (
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));

    this.authService.login(newUserLogin)
      .subscribe(
        res => {
          console.log(res.dataUser);
          this.router.navigate(['/home']);
        },
        err => {
          this.errObj = err;
          console.log(this.errObj);
          //console.log(errObj.status + ' ' + this.errObj.statusText);
        }  
      );
  }

}
