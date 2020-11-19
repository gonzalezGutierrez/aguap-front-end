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

  ngOnInit() {
  }
  
  see_profile():void{
    console.log("ir a mi perfil ");
    this.router.navigate(['profile']);
  }
  link_your_emails():void{
    console.log("ir a vincular mis correos electronicos");
    this.router.navigate(['accounts']);
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
