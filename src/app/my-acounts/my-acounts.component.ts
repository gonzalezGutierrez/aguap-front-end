import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {regex} from 'src/environments/environment.prod'
import {UserService} from 'src/app/services/user.service';


@Component({
  selector: 'app-my-acounts',
  templateUrl: './my-acounts.component.html',
  styleUrls: ['./my-acounts.component.css']
})
export class MyAcountsComponent implements OnInit {

  emails:[];
  name="Alexis Perez gomez";//recuperar el nombre del usuario actual
  token:string='';//el token del usuario actual
  user_id:any;//obtener el id del usuario actual
  
  emailForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern(regex.validate_email)]],
  });

  constructor(private fb: FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjQ2NTNhMTc1ZmM3NTk5Y2I2MWJiNTExNWRkOTdlMmM1YzZjNzAxZWUwYmNlNzllYTM2MWIzMDE3ZTlmNjhjZGQyOTRiYmJiY2JlYjM4NDkiLCJpYXQiOjE2MDM5OTkzMTIsIm5iZiI6MTYwMzk5OTMxMiwiZXhwIjoxNjM1NTM1MzEyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cYbauP17fjmrLSAsC27eeeEJfnq5heRcFQ2rSb1vxkm--Wp7OdvqgF32bC8jItZG8uaVJYnyx-aPFbpFzfOI3d1EcTvpYuhspajeHXmRO3eIrSMW6sBwQ3oIYuuC7sCdQQt3f6UzH1bly8wU1_KNPg7yD4-CjjON95EyVH3XqbidMXWgDHkjisrckxEBYo9Q_i0sd85he1LENfLtqZQoNL6akWDBBfC_qQusPLgIZdqqmSQTKAaPi1THlVnCi1cKwYre6XQ9kKF6dwhXh4tYJSK9iU_bUj85iAn8NDJ205_5qwv-SGKM6As9u1TpptIv3ZBO5suobLSMfHGU49oFAQr7tmoQcDIi8IjrbHom_XkjtVE7GmwrJydevLfc4FzM9mILefAASdgKfZ1hWP67clkkjS7SUnf0bhpfeWepfSQJiLw3iMn4UYYZkXeBhISFdz4o9tPiEYp1Lk4nROzfOOVp0XK8EueqOoOzb3GGtBe6t4hNI76P2h5P7Wdt9m8pvaZm6uxkfcfZngaRijN0nuI94ADED5xA6Kk1v9XhYy3G_YKTqG1xdyBJlpbnbMn60-1XuxqTU0e-lzLyHfDxLH22myzHHSuJ1JkhOb2M0yYuVPv_mD_AJa-hnV9Kd4RGFh_yRqv3GU_lZ-B5KtkXtDSnfhphlbTE8v5EH1EwyUw";
    this.user_id=1;
    this.get_emails();
  }

  getMessageError(){
    if(this.emailForm.get('email').hasError('required')){
      return "campo requerido";
    }
    else{
      return "dirección electrónica invalida";
    }

  }

  send_email():void{
   const email=this.emailForm.get('email').value;
   this.userService.addNewEmail(this.user_id,this.token,email)
   .subscribe(response=>{
     this.get_emails();
    },error=>{
      console.log("error ",error);
    });
  }

  get_emails(){
    this.userService.get_emails(this.user_id,this.token)
    .subscribe(response=>{
      this.emails=response;
    },error=>{
      console.log("error",error);
    });
  }

  delete_email(email:any){
    this.userService.delete_email(email.id,this.token)
    .subscribe(response=>{
      this.get_emails();
    },error=>{
      console.log("error ",error);
    });
  }

}
