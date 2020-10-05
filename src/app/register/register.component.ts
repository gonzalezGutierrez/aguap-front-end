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
  status:boolean=true;
  hide=true;
  email_Value:string='';
  
  email = new FormControl('', [Validators.required, Validators.email]);
  user=new FormGroup({
    name:new FormControl('',Validators.required),
    last_name:new FormControl('',Validators.required),
    cellphone:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    password_confirmation:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
  })

  name=this.user.get('name').value;
  last_name=this.user.get('last_name').value;
  user_email=this.email.value;
  cellphone=this.user.get('cellphone').value;
  idRol=1;
  password=this.user.get('password').value;
  password_confirmation=this.user.get('password_confirmation').value;
  user_status:number=0;
  
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
    let person=new User(this.name,this.last_name,this.user_email,this.cellphone,
      this.idRol,this.password,this.password_confirmation,this.user_status);
    console.log("persona ",this.name);
    console.log(person);
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
