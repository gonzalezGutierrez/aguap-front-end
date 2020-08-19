import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email_Value:string;
  constructor() { }
 
  ngOnInit() {
    this.email_Value=localStorage.getItem('send_email');
  }

  email = new FormControl('', [Validators.required, Validators.email]);
 
  getErrorMessage() {

    if (this.email.hasError('required')) {
      return 'ingresa una dirección electronica';
    }
    if(this.email.hasError('email')){
      return 'invalida dirección electronica'; 
    }
  }

  submitForm():void{
    console.log("email recuperado",this.email.value);
    console.log("removido ",this.email_Value)
    localStorage.removeItem('send_email');
    this.email_Value="";
  }

}
