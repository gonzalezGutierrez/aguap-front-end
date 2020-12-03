import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import  {UserService} from 'src/app/services/user.service';
import {Alert}from 'src/app/alerts/alert';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  data:string='';
  token:string=''
  id:string='';
  
  constructor(private activateRoute:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.data=this.activateRoute.snapshot.params.token;
    var str=this.data.split('&');
    this.token=str[0];
    this.id=str[1];
    this.accountActivation(this.token,this.id);
  }

  accountActivation(token:string,id:string):void{
    const alert=new Alert();
    this.userService.userAccountActivation(token,id) 
    .subscribe(response=>{
      alert.sucessful("cuanta activada",false);
    },error=>{
      alert.error("intentelo mas tarde",false);
    });
  }

}
