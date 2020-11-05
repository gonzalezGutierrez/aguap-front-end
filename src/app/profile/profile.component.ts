import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Iuser} from 'src/app/models/InterfaceUser'
import {User} from 'src/app/models/user';
import {regex} from 'src/environments/environment.prod';
import {Alert} from 'src/app/alerts/alert';
import {myCurrentPassword,ValidateOldPassword} from 'src/app/profile/customvalidator';
import * as CryptoJS from 'crypto-js';
import {UserMethods} from 'src/app/models/globalUserMethods';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Iuser:Iuser;
  id:number=0;
  token:string='';
  status:boolean=false;
  button_status_profile=true;
  status_password:boolean=false;
  button_status_password=true;
  idRol:number=0;
  hide = true;
  alert=new Alert();
  userMethods=new UserMethods();
  profile=this.profileForm.group({
    name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    cell_phone:['',[Validators.required,Validators.maxLength(10),Validators.pattern(regex.validate_cell_phone)]],
    email:['',[Validators.required,Validators.pattern(regex.validate_email)]],
  })

  profilePassword=this.passwordForm.group({
    before_password:['',[Validators.required,ValidateOldPassword]],
    new_password:['',[Validators.required,Validators.pattern(regex.validate_password)]]
  });

  constructor(private userService:UserService,private profileForm:FormBuilder,
    private passwordForm:FormBuilder) { 

  }

  ngOnInit() {
    
    this.profile.disable();
    this.profilePassword.disable();
    this.id=1;//senecesita recuperar el id del usuario y asignarla ala variable serecupera des el login
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjQ2NTNhMTc1ZmM3NTk5Y2I2MWJiNTExNWRkOTdlMmM1YzZjNzAxZWUwYmNlNzllYTM2MWIzMDE3ZTlmNjhjZGQyOTRiYmJiY2JlYjM4NDkiLCJpYXQiOjE2MDM5OTkzMTIsIm5iZiI6MTYwMzk5OTMxMiwiZXhwIjoxNjM1NTM1MzEyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cYbauP17fjmrLSAsC27eeeEJfnq5heRcFQ2rSb1vxkm--Wp7OdvqgF32bC8jItZG8uaVJYnyx-aPFbpFzfOI3d1EcTvpYuhspajeHXmRO3eIrSMW6sBwQ3oIYuuC7sCdQQt3f6UzH1bly8wU1_KNPg7yD4-CjjON95EyVH3XqbidMXWgDHkjisrckxEBYo9Q_i0sd85he1LENfLtqZQoNL6akWDBBfC_qQusPLgIZdqqmSQTKAaPi1THlVnCi1cKwYre6XQ9kKF6dwhXh4tYJSK9iU_bUj85iAn8NDJ205_5qwv-SGKM6As9u1TpptIv3ZBO5suobLSMfHGU49oFAQr7tmoQcDIi8IjrbHom_XkjtVE7GmwrJydevLfc4FzM9mILefAASdgKfZ1hWP67clkkjS7SUnf0bhpfeWepfSQJiLw3iMn4UYYZkXeBhISFdz4o9tPiEYp1Lk4nROzfOOVp0XK8EueqOoOzb3GGtBe6t4hNI76P2h5P7Wdt9m8pvaZm6uxkfcfZngaRijN0nuI94ADED5xA6Kk1v9XhYy3G_YKTqG1xdyBJlpbnbMn60-1XuxqTU0e-lzLyHfDxLH22myzHHSuJ1JkhOb2M0yYuVPv_mD_AJa-hnV9Kd4RGFh_yRqv3GU_lZ-B5KtkXtDSnfhphlbTE8v5EH1EwyUw"; 
    //se necesita recuperar el token y asignarle ala variable se recupera desde el login
    this.oldPasword();
    this.userService.userById(this.id,this.token)
    .subscribe(response=>{
      this.Iuser=response;
      this.initialize_data();
    },error=>{
      console.log("error ",error);
    });

  }
  initialize_data(){
    let user_name=this.Iuser.name;
    let user_last_name=this.Iuser.lastName;
    let user_email=this.Iuser.email;
    let user_cell_phone=this.Iuser.phone;
    let idRol=this.Iuser.idRol;
    this.profile.controls['name'].setValue(user_name);
    this.profile.controls['last_name'].setValue(user_last_name);
    this.profile.controls['email'].setValue(user_email);
    this.profile.controls['cell_phone'].setValue(user_cell_phone);
  }

  profile_edit(){
    if(this.status==false){
      this.status=true;
      this.button_status_profile=false;
      this.profile.enable();
      this.initialize_data(); 
    }
    else{
      this.deactivateProfileFields();
    }
  }

  password_edit(){
    if(this.status_password==false){
      this.status_password=true;
      this.button_status_password=false;
      this.profilePassword.enable();
      this.profilePassword.reset();
    }
    else{
      this.deactivatePasswordFields();
    }
  }

  change_data():void{
    if(this.profile.invalid){
      this.alert.error("formato invalido",true);
    }
    else{
      var name=this.profile.get('name').value;
      var lastName=this.profile.get('last_name').value;
      var email=this.profile.get('email').value;
      var phone=this.profile.get('cell_phone').value;
      var user =new User(name,lastName,email,phone);
      this.userService.updateUser(this.token,user,this.id)
      .subscribe(response=>{
        this.Iuser=response;
        this.alert.sucessful("actualizado",true);
        this.deactivateProfileFields();
      },error=>{
        console.log("error ",error);
      });
    }
  }

  change_password():void{
    if(this.profilePassword.invalid){
      this.alert.error("formato invalido",true);
    }
    else{
      const generate_key=this.userMethods.generateKey();
      const newPassword=CryptoJS.AES.encrypt(this.profilePassword.get('new_password').value.trim(),
      generate_key.trim()).toString();
      this.userService.changeUserPassword(this.token,newPassword,this.id,generate_key)
      .subscribe(response=>{
        this.alert.sucessful("contrasañe actualizada",true);
        this.deactivatePasswordFields();
        this.oldPasword();
      },
      error=>{
        console.log("error ",error);
      });
    }
     
  }

  isValidField(field:string,myForm:FormGroup){
    var FormControl=myForm.get(field);
    if((FormControl.touched||FormControl.dirty)&&FormControl.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  getErrorMessage(field:string,myForm:FormGroup):string{
    var FormControl=myForm.get(field);
    if(FormControl.hasError('required')){
      return "campo necesario";
    }
    if(FormControl.hasError('maxlength')){
      return "tu número de teléfono debe contener 10 digitos";
    }
    if(FormControl.hasError('pattern')){
      if(myForm.get(field)===myForm.get('cell_phone')){
        return "ingrese un número de teléfono valido";
      }
      if(myForm.get(field)===myForm.get('email')){
        return "dirección electrónica invalida"
      }
      else{
        return "la contraseña debe contener almenos una letra mayuscula,minuscula,un digito y un caracter especial";
      }
     
    }
    if(FormControl.errors.CurrentPassword){
      return "contraseña no coincide con la actual";
    }

  }

  oldPasword():void{
    this.userService.usersCurrentpassword(this.token,this.id)
    .subscribe(response=>{
      const generate_key=this.userMethods.generateKey();
      const encrypted=CryptoJS.AES.encrypt(response.password.trim(),generate_key.trim()).toString();
      myCurrentPassword(encrypted,generate_key);
    },
    error=>{
      console.log("error",error);
    });

  }

  deactivateProfileFields():void{
    this.status=false;
    this.button_status_profile=true;
    this.profile.disable();
    this.initialize_data();
  }
  deactivatePasswordFields():void{
    this.status_password=false;
    this.button_status_password=true;
    this.profilePassword.disable();
    this.profilePassword.reset();
  }


} 

