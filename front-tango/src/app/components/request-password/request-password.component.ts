import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css']
})
export class RequestPasswordComponent implements OnInit {
  requestPasswordForm: FormGroup;
  submitted = false;  

  errObj: {} = {
    status: false, 
    error: {message: ''}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  // convenience getter for easy access to form fields
  get f() { return this.requestPasswordForm.controls; }    

  ngOnInit() {
    this.requestPasswordForm = this.formBuilder.group({
      email             : ['', [Validators.required, Validators.email]]
    });    
  }

  forgotPassword() {
    this.submitted = true;

    if (this.requestPasswordForm.invalid) {
      return;
    };    
    
  }

}
