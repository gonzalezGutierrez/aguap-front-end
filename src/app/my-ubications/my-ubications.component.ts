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
  name:string='';
  lastName:string='';
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user_data= JSON.parse(localStorage.getItem('usuario'));
    this.token=this.user_data.token; 
    this.name=this.user_data.name;
    this.lastName=this.user_data.lastName;
    this.nombre=this.name+" "+this.lastName;
    console.log("el nombre es ",this.nombre);
    console.log("el token es ",this.token);
    this.get_ubications();
  }

  delete_ubication(ubication:any):void{
    
  }

  get_ubications():void{
  
  }

}
