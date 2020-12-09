import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { AuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider,GoogleLoginProvider } from "angularx-social-login";

import {UserService} from 'src/app/services/user.service'



import {Validation} from '../formValidations/validation';
import { FormBuilder } from '@angular/forms'
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  hide = true;
  token="";
  id:number;
  credentials:any;

  constructor(private router:Router,private authService:AuthService, private usuarioService:UsuariosService,
    private userService:UserService) {

  validation=new Validation();
  valid=false;
  profile=this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  })
  constructor(
    private router:Router,private authService:AuthService, 
    private userService:UserService,private fb: FormBuilder){

    this.credentials={
      id:this.id=5,
      token:this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTI0ZTU3NDJmZmM5MmE4MDRmZDFiYTgzOTgyNmRlYWI0MjM5NGFhNmFjNGI3NmI1NzJhZDI2NTIyNDZjNjZiNDViYmUwMmY0NzBkNDJjYmYiLCJpYXQiOjE2MDU3MzQyMTIsIm5iZiI6MTYwNTczNDIxMiwiZXhwIjoxNjM3MjcwMjEyLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.faKoJZ1WZ2NIVi4XtnIcDEC_jadgJ7PX5GTvKNfX5b8HGndzPld-6VRHsVflzJI99ugK-cZbmKZeQjYoQgJ3euaQSDQp3SjJZp7PSpts62Dk4boVQvw8i9-ViNsiSVuKUV8uH4c_Vii_IT2EQD0jIADnilvVmaV7ZNIgLSnFrmnYgZsP21D9xLlN5G02LEQB10fH90APDCc8CZNv5SuGlzFoCqBakc5uWZABEXmWOM6pra7rfpl5C5YU40qzMtCKSBfeEKyTSNCKwbe87Jl1In-bb_aiEqLfFgGDaOvmgN7QXrdCinBGmZxwZi9QCx4hDZDU5tObBUXJqO9pl9Gt3UAMz2IyAN68O5aJC-p5-Pd_Qs56pzif4afxLetNH0bKBjZ-PjZhMGE4y3d3I0y9TJrWN_bFg1mTBI80lL0712W3sV_RFMJSwsf6rfeJdANMQct1ZQSlwvXhLMr6Fhpnrjxo7NikSpcxKS-YYSaJOyhYpZ2D4PktZ7-cwgzQlhnAUp74DL8VeXgDKoElvzWKgCVNS2q_ZY9ipuQ43iPOYb9TMjSAJ0wBpXYroL9eBVNdOE8I59OoamdRJORQAeQqWfBKxTl6wVKpGiNZZF8BWmeijqQJRNxsf3MRy80j3r35y0YBGDwTRefPMf_UD7rQnSe32MMhDGKx4Bc96EpSluA"
    }
  }
  ngOnInit(){

  }

  isValidField(field:string){
    return this.validation.isValidField_V(this.profile,field);
  }

  getErrorMessage(field:string){
    return this.validation.getErrorMessage_V(this.profile,field)
  }
  
  
  submitForm() :void{

    console.log(this.profileForm.get('password').value);
    console.log(this.profileForm.get('email_o_phoneNumber').value); 
    localStorage.setItem('usuario', JSON.stringify(this.credentials));
    this.usuarioService.Email(this.profileForm.get('email_o_phoneNumber').value);
    this.router.navigate(['user'])

    if(this.profile.valid){
      this.valid=false;
      let email=this.profile.get('email').value;
      let password=this.profile.get('password').value;
      console.log("valido ",password,email);
      this.userService.login(email,password)
      .subscribe(response=>{
        console.log("resupuesta ",response);
      },error=>{
        console.log("error",error);
      });
    }
    else{
      this.valid=true;
    }

  }

  login_with_Google():void{
    console.log("google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("el usuario es ",this.user);

      this.usuarioService.upDates(this.user.email, this.user.firstName, this.user.lastName);
      this.userService.findEmail(this.user.email).subscribe(
        response => {
          console.log("Email registrado",response);
          this.router.navigate(['user'])
        },error=>{
          console.log("Email no registrado",error);
          this.router.navigate(['postRegister'])
        });
      });
      

      //this.usuarioService.upDates(this.user.email, this.user.firstName, this.user.lastName);
      this.router.navigate(['user'])
    });

  }

  login_with_Facebook():void{
    console.log("Facebook");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  
}
