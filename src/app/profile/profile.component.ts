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
import {Validation} from '../formValidations/validation';

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
  validation=new Validation();
  user_data:any;
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
    this.user_data= JSON.parse(localStorage.getItem('usuario'));
    this.id=this.user_data.id;
    this.token=this.user_data.token; 
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
    if(this.profile.valid){
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
    if(this.profilePassword.valid){
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
    return this.validation.isValidField_V(myForm,field);
  }

  getErrorMessage(field:string,myForm:FormGroup):string{
    return this.validation.getErrorMessage_V(myForm,field);
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

