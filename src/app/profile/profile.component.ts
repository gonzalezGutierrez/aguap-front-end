import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormGroup,FormBuilder, Form} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Iuser} from 'src/app/models/InterfaceUser'
import {User} from 'src/app/models/user';
import {regex} from 'src/environments/environment.prod';
import {Alert} from 'src/app/alerts/alert';
//import Swal from 'sweetalert2';
//import {MustMatch} from 'src/app/register/confirm-password.validator';
import {myCurrentPassword,ValidateOldPassword} from 'src/app/profile/customvalidator';


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
    new_password:['',[Validators.required]]
  });

  constructor(private userService:UserService,private profileForm:FormBuilder,
    private passwordForm:FormBuilder) { 

    }

  ngOnInit() {
    
    this.profile.disable();
    this.profilePassword.disable();
    this.id=24;//senecesita recuperar el id del usuario y asignarla ala variable serecupera des el login
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDQ5MGFkZjRhZGFjYzNhNmZlMDZiZTgxODVhYzEyMjE0YTY1YjBhMzViZTdjN2E4ZDAwZmFlY2Q4MTBiMmU4YzMwNmJiYTVmNDc4N2VjNDkiLCJpYXQiOjE1OTgyNDM1NjMsIm5iZiI6MTU5ODI0MzU2MywiZXhwIjoxNjI5Nzc5NTYyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.JUEOP5uG7RrlyMEZaoZpD-pLrIkbOrqJKTDMtJEScWm4EK4N5N1aqWsPWO_Bl8MsZLz4SWE_AuKKDowd69hh0iKxKZ6HuPgk0_C4VquuTVvzT4Nhf5JSSl5AoUfB4u8UJk01r_lDRYIg9m-KxIdYwgt8FGYi3eklDFEGLt0AnftTZOjGxViyQ4KZZzEuZNQWGaEJcHMpekt8hqAzC_qIulH_CYNBXodn_bb7CkoNz5y1JhhecLA1ttTopHfyzgUmoa_PH7AuxOwUcoeZw5CYzQhzptWGdz7qRarfcfbhhZ6kijAxs6Yethy1Oq7hdrmLZR1ttVOQyxhmIO3xLrvmn2dVVXDIlW687v5GE1PHNtjboI4oXH4zWWZQ9y7PAKLxngHVxOt1TJJBfhrJMgO-YhsaXNmGcBMmaNIn38V6GU9TRRIQShqkVabNJKkPde36uA0EG16gy7dYQNsZLsrhj7nYQEGaen1ppR2jG4Mt0KJGSRXfE4T3cU0ZKGBLD4KejShvJY7gl5SVsjPSYLl-ZsNqxs19S9Rh8Vibfd6X47OSsPdkWP8Puef3JlC6GJnxDlFrcSeERJjaX88TqLwS0wLWEQOHRJr8jdnzj4SstlVjGK2as3BBOJDngl17WzakaucVYesKfIhAViVMhgMbMmRLGj8EydgU0ol3L8wU0Q8"; 
    //se necesita recuperar el token y asignarle ala variable se recupera desde el login
    this.oldPasword();
    this.userService.userById(this.id,this.token).subscribe(
      response=>{
        console.log("desde el Onit ",response);
        this.Iuser=response;
        this.initialize_data();
      },error=>{
        console.log("error ",error);
      }
    );

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
      this.initialize_data();//inicializar los datos para no quedar con errores 
    }
    else{
      this.status=false;
      this.button_status_profile=true;
      this.profile.disable();
      this.initialize_data();//inicializar los datos para no quedar con errores
    }
  }

  password_edit(){
    if(this.status_password==false){
      this.status_password=true;
      this.button_status_password=false;
      this.profilePassword.enable();
    }
    else{
      this.status_password=false;
      this.profilePassword.disable();
      this.button_status_password=true;
    }
  }

  change_data():void{
    if(this.profile.invalid){
      this.alert.error("formato invalido",true);
    }
    else{
      console.log("cambiar datos");
    }
  }

  change_password():void{
    if(this.profilePassword.invalid){
      this.alert.error("llene los campos",true);
    }
    else{
      console.log("cambiar contraseña")  
    }
     
  }

  isValidField(field:string):boolean{
    var profileFormControl=this.profile.get(field);
    if((profileFormControl.touched ||profileFormControl.dirty) &&profileFormControl.invalid ){
      return true;
    }
    else{
      return false;
    }
   
  }

  isValidPassword(field:string,myForm:FormGroup){
    var FormControl=myForm.get(field);
    //console.log("my form ",myForm);
    if((FormControl.touched||FormControl.dirty)&&FormControl.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  getErrorMessage(field:string):string{

    if(this.profile.get(field).hasError('required')){
      console.log("requerido");
      return "campo necesario";
    }
    if(this.profile.get(field).hasError('maxlength')){
      console.log("max length");
      return "tu número de teléfono debe contener 10 digitos";
    }
    if(this.profile.get(field).hasError('pattern')){
      console.log("pattern");
      if(this.profile.get(field)==this.profile.get('cell_phone')){
        console.log("pattern telefono");
        return "ingrese un número de teléfono valido";
      }
      else{
        console.log("pattern correo electoronico");
        return "correo electrónico invalido";
      }
     
    }
    
  }

  passwordError(field:string):string{
    if(this.profilePassword.get(field).hasError('required')){
      console.log("requerido");
      return "campo requerido";
    }
    if(this.profilePassword.get(field).errors.CurrentPassword){
      console.log("entro en before password ");
      return "contraseña no coincide con la actual";
    }
  }
  
  oldPasword():void{
    this.userService.usersCurrentpassword(this.token,"alexis123",26)
    .subscribe(
      response=>{
        console.log("respuesta ",response.password);
        myCurrentPassword(response.password);
      },error=>{
        console.log("error",error);
      }
  
    );

  }

} 
