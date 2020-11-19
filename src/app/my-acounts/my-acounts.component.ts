import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {regex} from 'src/environments/environment.prod'
import {UserService} from 'src/app/services/user.service';
import{Validation} from '../formValidations/validation';

@Component({
  selector: 'app-my-acounts',
  templateUrl: './my-acounts.component.html',
  styleUrls: ['./my-acounts.component.css']
})
export class MyAcountsComponent implements OnInit {
  emails:[];
  name="Alexis Perez gomez";//recuperar el nombre del usuario actual
  user_data:any;
  token:string='';//el token del usuario actual
  id:number;//obtener el id del usuario actual
  validation=new Validation();

  emailForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern(regex.validate_email)]],
  });

  constructor(private fb: FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.user_data= JSON.parse(localStorage.getItem('usuario'));
    this.id=this.user_data.id;
    this.token=this.user_data.token; 
    this.get_emails();
  }
  isValidField(field:string):boolean{
    return this.validation.isValidField_V(this.emailForm,field);
  }
  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(this.emailForm,field);
  }

  send_email():void{
    if(this.emailForm.valid){
      const email=this.emailForm.get('email').value;
      this.emailForm.reset();
      this.userService.addNewEmail(this.id,this.token,email)
      .subscribe(response=>{
        this.get_emails();
      },error=>{
        console.log("error ",error);
      });
    } 
   
  }

  get_emails(){
    this.userService.get_emails(this.id,this.token)
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
