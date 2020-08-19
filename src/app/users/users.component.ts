import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
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
