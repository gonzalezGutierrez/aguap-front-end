import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliverer-list',
  templateUrl: './deliverer-list.component.html',
  styleUrls: ['./deliverer-list.component.css']
})
export class DelivererListComponent implements OnInit {

  deliverers:[];
  
  constructor() { }

  ngOnInit() {
  }

  get_deliverers(){
    console.log("get entreadores");
  }

  delete():void{
    console.log("eliminar repartidor");

  }

}
