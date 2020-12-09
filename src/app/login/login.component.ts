import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { AuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider,GoogleLoginProvider } from "angularx-social-login";
import {Validation} from '../formValidations/validation';
import { FormBuilder } from '@angular/forms'
import {UserService} from 'src/app/services/user.service';
import {Alert} from 'src/app/alerts/alert';

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
  //credentials:any;
  alert =new Alert();
  validation=new Validation();
  valid=false;
  profile=this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  })
  constructor(
    private router:Router,private authService:AuthService, 
    private userService:UserService,private fb: FormBuilder){
    /*this.credentials={
      id:this.id=5,
      token:this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzEyZTdjZTVhYWM5YjgyODczM2Y2MWE1ZDA4ZDMxNzc5ZDVhZGUwNzA4NTU3YWQ4ZGE1ZjkxMTRiZTQ0NzkyZjNlODM4Y2JlNmZhYTczZjQiLCJpYXQiOjE2MDczMDIwMDcsIm5iZiI6MTYwNzMwMjAwNywiZXhwIjoxNjM4ODM4MDA2LCJzdWIiOiIyMjYiLCJzY29wZXMiOltdfQ.HQnUyJF6TK_FB7e-vT-8Pfk7UIk_PfhiX0dKfMH3-pikNnPAPqZU0YJmwlA9MZRmtg2C4h9wCyUio2E2ewZSEKcknACFEjyBeTNu75Pf-XgEv9_nMWUxETzRs4KTZQQ7zkqBauXmWZe9s07RrCXTziroZxpnKkf2BilspQkZ3v19nRjrLsd9Ahz7XcZSRlo21gI2GeUokvoA3IMHJa25K39d0Az3ZA7wFrf1f109K2VvUG5a7lI1Fa8d7jIHK2SSjusM39HzCb7e_xxfPJtVbH7SLrgran1JtBdY_KdrBvFIRmnfUPKIlN5sE9rhS3gsiCyR4ZQuxj8WH9QUcxtb_g2qFOiurr63f68Uu5ilKScjkpshUbVCiVcQjatAIYIaQevixUWnrlmLiMVGxiv6_Z0LjuC5U4naRpZGFNjI7Ity-WKhfs9IwbTAKFvEBmKiU3DNO4jQZXTqqRU_jMQa7F0DV-1YAvBlzScm1rQ1W8J0eX-MoFKy2BFMR-UbFGqpcVPTsPPqVl0waTBYP_0QkjkMZ61GpRfQKhLPRnq-296C-g_1UhJ5iR3pHa7Arv8M6xHkeWg7RdTNxtnWThkQ9IoqQBVbQf5NfFsgVumBaqCKN93TPKg1gytFA6xHPYdAG1Cx89l_Qt5n-WIkqUjVzNKNtxgyrCvRGWMTbChtW4k"
    }
    console.log("token",this.credentials.token);
    localStorage.setItem('usuario', JSON.stringify(this.credentials));*/
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
    if(this.profile.valid){
      this.valid=false;
      let email=this.profile.get('email').value;
      let password=this.profile.get('password').value;
      console.log("valido ",password,email);
      this.userService.login(email,password)
      .subscribe(response=>{
        console.log("resupuesta ",response);
      },error=>{        
        this.user_error(error['error']);
        //this.alert.error("intentelo mas tarde",false);
      });
    }
    else{
      this.valid=true;
    }
  }

  user_error(error:any){
    console.log("respuesta user_error ",error.status);
    if(error.status==="Unauthorized"){
      console.log("contraseña o password incorrecta");
    }
    else{
      console.log("usuario no activado ");
      this.router.navigate(['recordar/activar/cuenta']);
    }
  
  }

  login_with_Google():void{
    console.log("google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.social_media_user();
  }

  login_with_Facebook():void{
    console.log("Facebook");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.social_media_user();
  }

  social_media_user(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("el usuario es ",this.loggedIn, "usuario ",this.user);
      if(this.loggedIn===true){
        this.existing_user(this.user.email);
      }
    });
  }

  existing_user(email:string){ /*si existe el usuario  obtener el token y pasar al menu usuario ,
    si no pasar al post-register*/
    this.userService.findEmail(email)
    .subscribe(response=>{
      this.router.navigate(['user']);
      console.log("respuesta ",response);
      this.signOut();
    },error=>{
      console.log("error",error,"me quedo con el usuario ",this.user);
      this.router.navigate(['postRegister',{
        email:this.user.email,
        name:this.user.firstName
      }]);
    })
  }
  signOut():void{
    this.authService.signOut();
  }
  
  

  
}