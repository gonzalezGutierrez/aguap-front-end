import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Iuser} from 'src/app/models/InterfaceUser'
import {User} from 'src/app/models/user';
import {regex} from 'src/environments/environment.prod';
import {Alert} from 'src/app/alerts/alert';
import {myCurrentPassword,ValidateOldPassword} from 'src/app/profile/customvalidator';
import * as CryptoJS from 'crypto-js';


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
    this.id=26;//senecesita recuperar el id del usuario y asignarla ala variable serecupera des el login
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDQ5MGFkZjRhZGFjYzNhNmZlMDZiZTgxODVhYzEyMjE0YTY1YjBhMzViZTdjN2E4ZDAwZmFlY2Q4MTBiMmU4YzMwNmJiYTVmNDc4N2VjNDkiLCJpYXQiOjE1OTgyNDM1NjMsIm5iZiI6MTU5ODI0MzU2MywiZXhwIjoxNjI5Nzc5NTYyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.JUEOP5uG7RrlyMEZaoZpD-pLrIkbOrqJKTDMtJEScWm4EK4N5N1aqWsPWO_Bl8MsZLz4SWE_AuKKDowd69hh0iKxKZ6HuPgk0_C4VquuTVvzT4Nhf5JSSl5AoUfB4u8UJk01r_lDRYIg9m-KxIdYwgt8FGYi3eklDFEGLt0AnftTZOjGxViyQ4KZZzEuZNQWGaEJcHMpekt8hqAzC_qIulH_CYNBXodn_bb7CkoNz5y1JhhecLA1ttTopHfyzgUmoa_PH7AuxOwUcoeZw5CYzQhzptWGdz7qRarfcfbhhZ6kijAxs6Yethy1Oq7hdrmLZR1ttVOQyxhmIO3xLrvmn2dVVXDIlW687v5GE1PHNtjboI4oXH4zWWZQ9y7PAKLxngHVxOt1TJJBfhrJMgO-YhsaXNmGcBMmaNIn38V6GU9TRRIQShqkVabNJKkPde36uA0EG16gy7dYQNsZLsrhj7nYQEGaen1ppR2jG4Mt0KJGSRXfE4T3cU0ZKGBLD4KejShvJY7gl5SVsjPSYLl-ZsNqxs19S9Rh8Vibfd6X47OSsPdkWP8Puef3JlC6GJnxDlFrcSeERJjaX88TqLwS0wLWEQOHRJr8jdnzj4SstlVjGK2as3BBOJDngl17WzakaucVYesKfIhAViVMhgMbMmRLGj8EydgU0ol3L8wU0Q8"; 
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
      const newPassword=this.profilePassword.get('new_password').value;
      this.userService.changeUserPassword(this.token,newPassword,this.id)
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
      if(myForm.get(field)==myForm.get('cell_phone')){
        return "ingrese un número de teléfono valido";
      }
      if(myForm.get(field)==myForm.get('email')){
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
      const generate_key=this.generateKey();
      var encrypted=CryptoJS.AES.encrypt(response.password.trim(),generate_key.trim()).toString();
      myCurrentPassword(encrypted,generate_key);
    },
    error=>{
      console.log("error",error);
    });

  }

  generateKey():string{
    var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    chars = 5,
    segments = 4,
    keyString = "";
		for( var i = 0; i < segments; i++ ) {
      var segment = "";
      for( var j = 0; j < chars; j++ ) {
        var k =(Math.floor(Math.random() * tokens.length));
				segment += tokens[ k ];
      }
      keyString += segment;
      if( i < ( segments - 1 ) ) {
				keyString += "-";
			}
    }
    return keyString;
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
    //this.hide=false;
  }

} 
