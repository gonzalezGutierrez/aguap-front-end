import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  @Input('lista-pedidos')  lista_pedidos:boolean=true;
  
  constructor() { }

  ngOnInit() {
    console.log("estoy en lista-pedidos ",this.lista_pedidos);
  }

}
