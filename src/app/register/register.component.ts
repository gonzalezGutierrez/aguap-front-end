import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service';
import {MustMatch} from 'src/app/register/confirm-password.validator';
import {Alert} from 'src/app/alerts/alert';
import {regex} from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status:boolean=true;
  hide=true;
  email_Value:string='';

  registerForm=this.fb.group({
    name: ['',Validators.required],
    last_name: ['',Validators.required],
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
    cell_phone: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(regex.validate_cell_phone),Validators.maxLength(10)]],
    password:['',[Validators.required,Validators.pattern(regex.validate_password)]],
    password_confirmation:['',[Validators.required]]
  },{
    validator: MustMatch('password', 'password_confirmation')
  });

  constructor(private router: Router,private userService:UserService,private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.email_Value=localStorage.getItem('send_email');
  }

  isValidField(field:string):boolean{
    var objectFormControl=this.registerForm.get(field);
    if( (objectFormControl.touched ||objectFormControl.dirty )&& objectFormControl.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  getErrorMessage(field:string):string{

    if(this.registerForm.get(field).hasError('required')){
      return "campo requerido"
    }
    if(this.registerForm.get(field).hasError('maxlength')){
      return "tu número de teléfono debe contener 10 digitos";
    }
    if(this.registerForm.get(field).hasError('pattern')){
      if(this.registerForm.get(field)===this.registerForm.get('email')){
        return "dirección electrónica invalido";
      } 
      if(this.registerForm.get(field)===this.registerForm.get('cell_phone')){
        return "teléfono móvil invalido";
      }
      else{
        return "la contraseña debe contener almenos una letra mayuscula,minuscula,un digito y un caracter especial";
      }
    }
    if(this.registerForm.get(field).errors.mustMatch){
      return "las contraseñas no coinciden";
    }
   
  }

 

  sendingData():void{
    localStorage.removeItem('send_email');
    this.email_Value="";
    var user_name=this.registerForm.get('name').value;
    var user_last_name=this.registerForm.get('last_name').value;
    var user_email=this.registerForm.get('email').value;
    var user_cellphone=this.registerForm.get('cell_phone').value;
    var user_idRol=1;
    var user_password=this.registerForm.get('password').value;
    var user_password_confirmation=this.registerForm.get('password_confirmation').value;
    var user_status="inactive";
    let person=new User(user_name,user_last_name,user_email,user_cellphone,
      user_idRol,user_password,user_password_confirmation,user_status);
    let alert=new Alert();
    this.userService.registerUser(person)
    .subscribe( response=>{
      console.log("respuesta ",response);
      alert.successfulRegistration();
      this.routeLogin();
    },error=>{
      console.log("error resepuesta",error);
    });
  }

  routeLogin():void{
    this.router.navigate(['login']);
  }


}
