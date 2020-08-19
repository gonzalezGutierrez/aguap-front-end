import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  status:boolean=true;
  name:string="alexis";
  last_name:string="Perez Gomez";
  cell_phone:string="9614465502"
  email_user:string="alexisperez2@gmail.com";
  password:string="holamundo";
  confirmation_password:string="holamundo";
  hide = true;
  
  enable_fields:string="habilitar campos";
  contador:number=0;
  constructor() { }

  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  enable_fields_forms():void{
    console.log("esl estatus antes del if ",this.status)
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
  change_data():void{
    this.status=true;
    this.enable_fields="habilitar campos"
  
  }

}
