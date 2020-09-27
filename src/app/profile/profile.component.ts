import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormGroup} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Iuser} from 'src/app/models/InterfaceUser'
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Iuser:Iuser;
  id:number=0;
  token:string='';
  status:boolean=true;
  //datos a mostrar en el prerfil del usuario
  name:string='';
  last_name:string='';
  cell_phone:string='';
  email_user:string='';
  password:string='';
  password_confirmation:string='';
  idRol:number=0;//esta dato no se muestra

  hide = true;
  enable_fields:string="habilitar campos";
 
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.id=1;//senecesita recuperar el id del usuario y asignarla ala variable serecupera des el login
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDQ5MGFkZjRhZGFjYzNhNmZlMDZiZTgxODVhYzEyMjE0YTY1YjBhMzViZTdjN2E4ZDAwZmFlY2Q4MTBiMmU4YzMwNmJiYTVmNDc4N2VjNDkiLCJpYXQiOjE1OTgyNDM1NjMsIm5iZiI6MTU5ODI0MzU2MywiZXhwIjoxNjI5Nzc5NTYyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.JUEOP5uG7RrlyMEZaoZpD-pLrIkbOrqJKTDMtJEScWm4EK4N5N1aqWsPWO_Bl8MsZLz4SWE_AuKKDowd69hh0iKxKZ6HuPgk0_C4VquuTVvzT4Nhf5JSSl5AoUfB4u8UJk01r_lDRYIg9m-KxIdYwgt8FGYi3eklDFEGLt0AnftTZOjGxViyQ4KZZzEuZNQWGaEJcHMpekt8hqAzC_qIulH_CYNBXodn_bb7CkoNz5y1JhhecLA1ttTopHfyzgUmoa_PH7AuxOwUcoeZw5CYzQhzptWGdz7qRarfcfbhhZ6kijAxs6Yethy1Oq7hdrmLZR1ttVOQyxhmIO3xLrvmn2dVVXDIlW687v5GE1PHNtjboI4oXH4zWWZQ9y7PAKLxngHVxOt1TJJBfhrJMgO-YhsaXNmGcBMmaNIn38V6GU9TRRIQShqkVabNJKkPde36uA0EG16gy7dYQNsZLsrhj7nYQEGaen1ppR2jG4Mt0KJGSRXfE4T3cU0ZKGBLD4KejShvJY7gl5SVsjPSYLl-ZsNqxs19S9Rh8Vibfd6X47OSsPdkWP8Puef3JlC6GJnxDlFrcSeERJjaX88TqLwS0wLWEQOHRJr8jdnzj4SstlVjGK2as3BBOJDngl17WzakaucVYesKfIhAViVMhgMbMmRLGj8EydgU0ol3L8wU0Q8"; 
    // se necesita recuperar el token y asignarle ala variable se recupera desde el login
    this.userService.userById(this.id,this.token).subscribe(
      response=>{
        console.log("desde el Onit ",response);
        this.Iuser=response;
        this.initialize_data(this.Iuser);
      },error=>{
        console.log("error ",error);
      }
    );

  }

  enable_fields_forms():void{
    if(this.status==true){
      this.status=false;
      console.log("esl estatus if true ",this.status);
      this.enable_fields="Deshabilitar campos"
    }
    else if (this.status==false){
      this.status=true;
      console.log("el estatus if falso ",this.status);
      this.enable_fields="Habilitar campos"
    }
  }
  change_data():void{ //falta validar que las contraseñas sean igual y que vallan las dos
    this.status=true;
    this.enable_fields="habilitar campos"

    if(this.password==''&& this.password_confirmation==''){ 
      let phone:number=parseInt(this.cell_phone);
      const person=new User(this.name,this.last_name,this.email_user,phone,this.idRol,this.password,this.password_confirmation);
      this.userService.updateUserById(this.id,this.token,person).subscribe(
        response=>{
          console.log("cambio sin password ",response);
          this.Iuser=response;
          this.initialize_data(this.Iuser);
        },error=>{
          console.log("error ",error);
        }
      );
    }
    else{
      let phone:number=parseInt(this.cell_phone);
      const person=new User(this.name,this.last_name,this.email_user,phone,this.idRol,this.password,this.password_confirmation);
      this.userService.updateUserById(this.id,this.token,person).subscribe(
        response=>{
          this.password='';
          this.password_confirmation='';
          this.Iuser=response;
          console.log("cambioa con password ",response);
          this.initialize_data(this.Iuser);
        },error=>{
          console.log("error ",error)
        }
      );

    }

  }
  initialize_data(user:Iuser){
    this.name=user.name;
    this.last_name=user.lastName;
    this.email_user=user.email;
    this.cell_phone=user.phone;
    this.idRol=user.idRol;
  }


}
