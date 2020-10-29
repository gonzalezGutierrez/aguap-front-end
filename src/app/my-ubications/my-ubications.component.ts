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
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.id=1; // se necesita recuperar el id del usuario ya logueado
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjQ2NTNhMTc1ZmM3NTk5Y2I2MWJiNTExNWRkOTdlMmM1YzZjNzAxZWUwYmNlNzllYTM2MWIzMDE3ZTlmNjhjZGQyOTRiYmJiY2JlYjM4NDkiLCJpYXQiOjE2MDM5OTkzMTIsIm5iZiI6MTYwMzk5OTMxMiwiZXhwIjoxNjM1NTM1MzEyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cYbauP17fjmrLSAsC27eeeEJfnq5heRcFQ2rSb1vxkm--Wp7OdvqgF32bC8jItZG8uaVJYnyx-aPFbpFzfOI3d1EcTvpYuhspajeHXmRO3eIrSMW6sBwQ3oIYuuC7sCdQQt3f6UzH1bly8wU1_KNPg7yD4-CjjON95EyVH3XqbidMXWgDHkjisrckxEBYo9Q_i0sd85he1LENfLtqZQoNL6akWDBBfC_qQusPLgIZdqqmSQTKAaPi1THlVnCi1cKwYre6XQ9kKF6dwhXh4tYJSK9iU_bUj85iAn8NDJ205_5qwv-SGKM6As9u1TpptIv3ZBO5suobLSMfHGU49oFAQr7tmoQcDIi8IjrbHom_XkjtVE7GmwrJydevLfc4FzM9mILefAASdgKfZ1hWP67clkkjS7SUnf0bhpfeWepfSQJiLw3iMn4UYYZkXeBhISFdz4o9tPiEYp1Lk4nROzfOOVp0XK8EueqOoOzb3GGtBe6t4hNI76P2h5P7Wdt9m8pvaZm6uxkfcfZngaRijN0nuI94ADED5xA6Kk1v9XhYy3G_YKTqG1xdyBJlpbnbMn60-1XuxqTU0e-lzLyHfDxLH22myzHHSuJ1JkhOb2M0yYuVPv_mD_AJa-hnV9Kd4RGFh_yRqv3GU_lZ-B5KtkXtDSnfhphlbTE8v5EH1EwyUw"
    //se necesita recuperar el token del usuario ya logueado
    this.get_ubications();
  }

  delete_ubication(ubication:any):void{
    this.userService.delete_ubication(ubication,this.token)
    .subscribe(response=>{
      console.log("respuesta ",response);
      this.get_ubications();
    },error=>{
      console.log("error ",error);
    });
  }

  get_ubications():void{
    this.userService.get_ubications(this.id,this.token)
    .subscribe(response=>{
      console.log("respuesta ",response);
      this.ubications=response;
    },error=>{
      console.log("error ",error);
    });
  }

}
