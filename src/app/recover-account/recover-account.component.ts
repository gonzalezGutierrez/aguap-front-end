import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import{regex} from 'src/environments/environment.prod';
import {MustMatch} from 'src/app/register/confirm-password.validator';
import {UserMethods} from 'src/app/models/globalUserMethods';
import * as CryptoJS from 'crypto-js';
import {UserService} from 'src/app/services/user.service';
import {Alert} from 'src/app/alerts/alert';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {
  hide= true;
  token:string='';
  id:any;
  data:string='';
  Alert=new Alert();
  userMethods=new UserMethods(); 
  profile=this.f.group({
    password:['',[Validators.required,Validators.pattern(regex.validate_password)]],
    confirmation_password:['',[Validators.required]]
  },
  {
    validator: MustMatch('password', 'confirmation_password')
  });

  constructor(private router:Router,private f:FormBuilder,
    private userService:UserService,
    private activatedRoute: ActivatedRoute){ 

  }

  ngOnInit() {
    this.data=this.activatedRoute.snapshot.params.token;
    var str=this.data.split('&');
    this.token=str[0];
    this.id=str[1];
    console.log("el token es ",this.token);
    console.log("el id es ",this.id);
  }

  isValidField(field:string):boolean{
    var form=this.profile.get(field);
    if((form.touched||form.dirty)&&form.invalid){
      return true;
    }
    else{
      return false;
    }
  }
  getErrorMessage(field:string):string{
    if(this.profile.get(field).hasError('required')){
      return "campo requerido";
    }
    if(this.profile.get(field).errors.mustMatch){
      return "las contraseñas deben coincidir";
    }
    if(this.profile.get(field).hasError('pattern')){
      return "error contraseña erronea";
    }
  }

  send_data():void{
    if(this.profile.invalid){
      console.log("error en la contraseña");
    }
    else{
      const generate_key=this.userMethods.generateKey();
      const NewPassword=CryptoJS.AES.encrypt(this.profile.get('confirmation_password')
      .value.trim(),generate_key.trim()).toString();
      this.userService.changeUserPassword(this.token,NewPassword,this.id,generate_key)
      .subscribe(response=>{
        console.log("respuesta response ",response);
        this.profile.reset();
        this.Alert.successful_account_message();
        this.router.navigate(['/login']);
      },error=>{
        console.log("error ",error);
        this.profile.reset();
        this.Alert.message_error('Oops...','','intentelo mas tarde');
      });
    }
  }

}
