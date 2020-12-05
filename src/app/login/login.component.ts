import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { AuthService,SocialUser } from "angularx-social-login";
import { UsuariosService} from 'src/app/usuarios.service';
import { FacebookLoginProvider,GoogleLoginProvider } from "angularx-social-login";
import {UserService} from 'src/app/services/user.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  token="";
  id:number;
  credentials:any;
  constructor(private router:Router,private authService:AuthService, private usuarioService:UsuariosService,
    private userService:UserService) {
    this.credentials={
      id:this.id=5,
      token:this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTI0ZTU3NDJmZmM5MmE4MDRmZDFiYTgzOTgyNmRlYWI0MjM5NGFhNmFjNGI3NmI1NzJhZDI2NTIyNDZjNjZiNDViYmUwMmY0NzBkNDJjYmYiLCJpYXQiOjE2MDU3MzQyMTIsIm5iZiI6MTYwNTczNDIxMiwiZXhwIjoxNjM3MjcwMjEyLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.faKoJZ1WZ2NIVi4XtnIcDEC_jadgJ7PX5GTvKNfX5b8HGndzPld-6VRHsVflzJI99ugK-cZbmKZeQjYoQgJ3euaQSDQp3SjJZp7PSpts62Dk4boVQvw8i9-ViNsiSVuKUV8uH4c_Vii_IT2EQD0jIADnilvVmaV7ZNIgLSnFrmnYgZsP21D9xLlN5G02LEQB10fH90APDCc8CZNv5SuGlzFoCqBakc5uWZABEXmWOM6pra7rfpl5C5YU40qzMtCKSBfeEKyTSNCKwbe87Jl1In-bb_aiEqLfFgGDaOvmgN7QXrdCinBGmZxwZi9QCx4hDZDU5tObBUXJqO9pl9Gt3UAMz2IyAN68O5aJC-p5-Pd_Qs56pzif4afxLetNH0bKBjZ-PjZhMGE4y3d3I0y9TJrWN_bFg1mTBI80lL0712W3sV_RFMJSwsf6rfeJdANMQct1ZQSlwvXhLMr6Fhpnrjxo7NikSpcxKS-YYSaJOyhYpZ2D4PktZ7-cwgzQlhnAUp74DL8VeXgDKoElvzWKgCVNS2q_ZY9ipuQ43iPOYb9TMjSAJ0wBpXYroL9eBVNdOE8I59OoamdRJORQAeQqWfBKxTl6wVKpGiNZZF8BWmeijqQJRNxsf3MRy80j3r35y0YBGDwTRefPMf_UD7rQnSe32MMhDGKx4Bc96EpSluA"
    }
  }
  ngOnInit(){

  }

  hide = true;
  profileForm = new FormGroup({
    email_o_phoneNumber:new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  
  submitForm() :void{
    console.log(this.profileForm.get('password').value);
    console.log(this.profileForm.get('email_o_phoneNumber').value); 
    localStorage.setItem('usuario', JSON.stringify(this.credentials));
    this.usuarioService.Email(this.profileForm.get('email_o_phoneNumber').value);
    this.router.navigate(['user'])
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
      
  }

  login_with_Facebook():void{
    console.log("Facebook");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  singOut():void{
    console.log("cerrar sesion");
    this.authService.signOut();
  }

  
}
