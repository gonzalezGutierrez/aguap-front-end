import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-elegir-medio-de-transporte',
  templateUrl: './elegir-medio-de-transporte.component.html',
  styleUrls: ['./elegir-medio-de-transporte.component.css']
})
export class ElegirMedioDeTransporteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  vehiculo():void{
    console.log("ir en veiculo");
    //this.router.navigate(['']);
  }
  triciclo():void{
    console.log("ir en tricilco");
  }

}
