import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService} from 'src/app/usuarios.service';
import Swal from 'sweetalert2';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router:Router, private usuarioService:UsuariosService, private userService:UserService) { }
  //public email_Value_001 = 'salva@gmail.com'
  //public email_Value_002 = 'jhon@gmail.com'
  public isButtonVisible = false;
  ngOnInit() {
   /* console.log(this.usuarioService.email)
    this.userService.findEmail(this.usuarioService.email).subscribe( 
      response => {
        console.log("Email registrado",response);
      },error=>{
        console.log("Email no registrado",error);
        this.isButtonVisible = true;
      Swal.fire({
        title:'Por favor termina tu registro',
        text: 'para poder mantener un historial de tu cuenta presiona el boton "Terminar registro"!',
        icon: 'warning',
        confirmButtonText: 'aceptar'
      });
      });*/

    /*if(this.usuarioService.email != this.email_Value_002){
      this.isButtonVisible = true;
      Swal.fire({
        title:'Por favor termina tu registro',
        text: 'para poder mantener un historial de tu cuenta presiona el boton "Terminar registro"!',
        icon: 'warning',
        confirmButtonText: 'aceptar'
      });
    }*/

  }
  postRegister(){
    this.router.navigate(['postRegister'])
  }
  see_profile():void{
    console.log("estoy en mi perfil");
    this.router.navigate(['profile']);
  }
  view_saved_locations():void{
    console.log("estoy en mis ubicaciones guardadas");
    this.router.navigate(['ubications'])
  }
  request_orders():void{
    console.log("estoy solicitando ordenes");
    this.router.navigate(['requestOrders']);
  }
  see_my_orders():void{
    console.log("estoy en mis ordenes")
    this.router.navigate(['orderList']);
  }
  coupon():void{
    console.log("estoy en solicitando cupon")
  }


}
