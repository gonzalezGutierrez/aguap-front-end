import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { AuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider,GoogleLoginProvider } from "angularx-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) {}
  user: SocialUser;
  loggedIn: boolean;
  ngOnInit(){
    
    this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    console.log("el usuario es ",this.user);
    });
    
  }
  
  hide = true;
  profileForm = new FormGroup({
    email_o_phoneNumber:new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  
  submitForm() :void{
    console.log(this.profileForm.get('password').value);
    console.log(this.profileForm.get('email_o_phoneNumber').value); 
    localStorage.setItem('send_email',this.profileForm.get('email_o_phoneNumber').value);
    this.router.navigate(['user'])
  }

  login_with_Google():void{
    console.log("google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  
  }

  login_with_Facebook():void{
    console.log("Facebook");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login_with_Instagram():void{
    console.log("instagram")
  }

  login_with_Titter():void{
    console.log("twitter");
  }

  singOut():void{
    console.log("cerrar sesion");
    this.authService.signOut();
  }


  
  
  

}
