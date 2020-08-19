import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {
  hide= true;

  password=new FormControl('',Validators.required);
  verify_password=new FormControl('',Validators.required);
  

  constructor(private router:Router) { }

  ngOnInit() {
  }

  send_data():void{
    console.log("password recover count  ",this.password.value);
    console.log("password recover count  ",this.verify_password.value);
    //this.router.navigate(['login']);
  }

}
