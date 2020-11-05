import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {regex} from 'src/environments/environment.prod';
import { Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {Alert} from 'src/app/alerts/alert';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  Alert=new Alert();

  profile=this.fb.group({
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
  })

  constructor(private fb:FormBuilder,private router:Router,private userService:UserService) {}

  ngOnInit() {}

  getErrorMessage(field:string) {
    if(this.profile.get(field).hasError('required')){
      return 'campo requerido';
    }
    else{
      return 'dirección electrónica invalida';
    }
  }

  isValidField(field:string){
    var control=this.profile.get(field);
    if((control.touched || control.dirty)&&control.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  submitForm():void{
    const email=this.profile.get('email').value;
    this.userService.accountRecoveryEmail(email)
    .subscribe(response=>{
      console.log("response ",response);
      this.Alert.sucessful('email enviado',true);
      this.profile.reset();
      this.router.navigate(['/login']);
    },error=>{
      console.log("error ",error);
      this.Alert.message_error('Oops...','','email no registrado en nuestro sistema');
      this.profile.reset();
    });
    
  }
  cancel():void{
    this.profile.reset();
    this.router.navigate(['/login']);
  }
}
