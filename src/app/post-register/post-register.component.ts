import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-register',
  templateUrl: './post-register.component.html',
  styleUrls: ['./post-register.component.css']
})
export class PostRegisterComponent implements OnInit {

  hide = true;
  email_Value:string;

  email = new FormControl('', [Validators.required, Validators.email]);
  
  user=new FormGroup({
    name:new FormControl('',Validators.required),
    last_name:new FormControl('',Validators.required),
    cellphone:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    password_confirmation:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
  })

  constructor(private router: Router) { }
  

  ngOnInit() {
    this.email_Value=localStorage.getItem('send_email');
    console.log("el valor del email es ",this.email_Value);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'ingresa una dirección electronica';
    }
    if(this.email.hasError('email')){
      return 'invalida dirección electronica'; 
    }
  }

  sending_data():void{
    console.log("los datos del usuario son estos ",this.user);
    console.log("valor del email ",this.email.value)
    console.log("email in the park ",this.email_Value);
    localStorage.removeItem('send_email');
    this.email_Value="";
  }

  route_login():void{
    this.router.navigate(['login'])
  }

}
