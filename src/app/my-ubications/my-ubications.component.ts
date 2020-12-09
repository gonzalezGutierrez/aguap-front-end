import { Component, OnInit ,ViewChild} from '@angular/core';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-my-ubications',
  templateUrl: './my-ubications.component.html',
  styleUrls: ['./my-ubications.component.css']
})
export class MyUbicationsComponent implements OnInit {
  id:number=0;
  token:string='';
  ubications:[];
  nombre="Alexis Perez Gomez"; //se encesita el nombre recuperado del componente login
  user_data:any;
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user_data= JSON.parse(localStorage.getItem('usuario'));
    this.id=this.user_data.id;
    this.token=this.user_data.token; 
    this.get_ubications();
  }

  delete_ubication(ubication:any):void{
    /*this.userService.delete_ubication(ubication,this.token)
    .subscribe(response=>{
      console.log("respuesta ",response);
      this.get_ubications();
    },error=>{
      console.log("error ",error);
    });*/
  }

  get_ubications():void{
    /*this.userService.get_ubications(this.id,this.token)
    .subscribe(response=>{
      console.log("respuesta ",response);
      this.ubications=response;
    },error=>{
      console.log("error ",error);
    });*/
  }

}
