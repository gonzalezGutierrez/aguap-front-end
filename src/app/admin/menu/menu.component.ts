import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  add_deliver_man(){
    console.log("add repartidor");
  }
  list_deliver_man(){
    console.log("listar reprtidor");
  }

}
