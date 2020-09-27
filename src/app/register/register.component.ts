import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
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
  constructor(private router: Router,private userService:UserService) { 

  }
  
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
    localStorage.removeItem('send_email');
    this.email_Value="";
    let name:string=this.user.get('name').value;
    let lastName:string=this.user.get('last_name').value;
    let email:string=this.email.value;
    let phone:number=this.user.get('cellphone').value;
    let idRol:number=1;
    let password:string=this.user.get('password').value;
    let password_confirmation:string=this.user.get('password_confirmation').value;
    let status:number=0;
    
    let person=new User(name,lastName,email,phone,idRol,password,password_confirmation,status);
    console.log(person)
    this.userService.registerUser(person)
    .subscribe( response=>{
      console.log("respuesta ",response);
      this.route_login();
    },error=>{
      console.log("error resepuesta",error);
    });

  }

  route_login():void{
    this.router.navigate(['login']);
  }


}
