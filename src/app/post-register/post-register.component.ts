import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService} from 'src/app/usuarios.service';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-post-register',
  templateUrl: './post-register.component.html',
  styleUrls: ['./post-register.component.css']
})
export class PostRegisterComponent implements OnInit {

  hide = true;
  email_value:string;
  name_value:string;
  email = new FormControl('', [Validators.required, Validators.email]);
  
  user=new FormGroup({
    name:new FormControl('',Validators.required),
    last_name:new FormControl('',Validators.required),
    cellphone:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    password_confirmation:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
  })

  constructor(private router: Router, private usuarioService:UsuariosService, private userService:UserService) { }
  
  ngOnInit() {
    //this.email_value=localStorage.getItem('send_email');
    this.email_value = this.usuarioService.email;
    this.name_value = this.usuarioService.firstName;
    console.log("datos de usuario = ",this.usuarioService.email, this.usuarioService.firstName);
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
    this.email_value="";
    let name:string=this.usuarioService.firstName;
    let lastName:string=this.usuarioService.lastName;
    let email:string=this.usuarioService.email;
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
      this.route_menu();
    },error=>{
      console.log("error resepuesta",error);
    });

  }

  route_menu():void{
    this.router.navigate(['user'])
  }

}
