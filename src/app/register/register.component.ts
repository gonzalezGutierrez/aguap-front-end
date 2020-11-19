import { Component, OnInit,Input} from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {MustMatch} from 'src/app/register/confirm-password.validator';
import {Alert} from 'src/app/alerts/alert';
import {regex} from 'src/environments/environment.prod';
import {Validation} from '../formValidations/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input('user') role_id:number=1;
  status:boolean=true;
  hide=true;
  email_Value:string='';
  validation=new Validation();
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
    return this.validation.isValidField_V(this.registerForm,field);
  }

  getErrorMessage(field:string):string{
    return this.validation.getErrorMessage_V(this.registerForm,field);
  }

  sendingData():void{
    localStorage.removeItem('send_email');
    this.email_Value="";
    var person=this.validation.get_person_V(this.registerForm,this.role_id);
    let alert=new Alert();
    console.log("persona ",person);
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
