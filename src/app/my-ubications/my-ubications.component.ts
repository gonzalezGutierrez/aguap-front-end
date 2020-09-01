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
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.id=2; // se necesita recuperar el id del usuario ya logueado
    this.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDQ5MGFkZjRhZGFjYzNhNmZlMDZiZTgxODVhYzEyMjE0YTY1YjBhMzViZTdjN2E4ZDAwZmFlY2Q4MTBiMmU4YzMwNmJiYTVmNDc4N2VjNDkiLCJpYXQiOjE1OTgyNDM1NjMsIm5iZiI6MTU5ODI0MzU2MywiZXhwIjoxNjI5Nzc5NTYyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.JUEOP5uG7RrlyMEZaoZpD-pLrIkbOrqJKTDMtJEScWm4EK4N5N1aqWsPWO_Bl8MsZLz4SWE_AuKKDowd69hh0iKxKZ6HuPgk0_C4VquuTVvzT4Nhf5JSSl5AoUfB4u8UJk01r_lDRYIg9m-KxIdYwgt8FGYi3eklDFEGLt0AnftTZOjGxViyQ4KZZzEuZNQWGaEJcHMpekt8hqAzC_qIulH_CYNBXodn_bb7CkoNz5y1JhhecLA1ttTopHfyzgUmoa_PH7AuxOwUcoeZw5CYzQhzptWGdz7qRarfcfbhhZ6kijAxs6Yethy1Oq7hdrmLZR1ttVOQyxhmIO3xLrvmn2dVVXDIlW687v5GE1PHNtjboI4oXH4zWWZQ9y7PAKLxngHVxOt1TJJBfhrJMgO-YhsaXNmGcBMmaNIn38V6GU9TRRIQShqkVabNJKkPde36uA0EG16gy7dYQNsZLsrhj7nYQEGaen1ppR2jG4Mt0KJGSRXfE4T3cU0ZKGBLD4KejShvJY7gl5SVsjPSYLl-ZsNqxs19S9Rh8Vibfd6X47OSsPdkWP8Puef3JlC6GJnxDlFrcSeERJjaX88TqLwS0wLWEQOHRJr8jdnzj4SstlVjGK2as3BBOJDngl17WzakaucVYesKfIhAViVMhgMbMmRLGj8EydgU0ol3L8wU0Q8"
    //se necesita recuperar el token del usuario ya logueado
    this.get_ubications();
  }

  delete_ubication(ubication:any):void{
    console.log("borrar ubicaciones",ubication);
    this.userService.delete_ubication(ubication,this.token).subscribe(
      response=>{
        console.log("respuesta ",response);
        this.get_ubications();
      },error=>{
        console.log("error ",error);
      }
    );
  }

  get_ubications():void{
    console.log("obtener ubicaciones");
    this.userService.get_ubications(this.id,this.token).subscribe(
      response=>{
        console.log("respuesta ",response);
        this.ubications=response;
        console.log("mis ubicaciones");
        console.log(this.ubications);
      },error=>{
        console.log("error ",error);
      }
    );
  }

}
