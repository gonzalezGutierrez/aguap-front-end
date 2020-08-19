import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment.prod'; 
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-request-ordes',
  templateUrl: './request-ordes.component.html',
  styleUrls: ['./request-ordes.component.css']
})
export class RequestOrdesComponent implements OnInit {
  map: Mapboxgl.Map;
  constructor() { 
    
  }

  ngOnInit() {
    Mapboxgl.accessToken =environment.mapBoxkey
    this.map = new  Mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-93.1075127,16.7534462], // starting position LNG LT
    zoom:15.42// starting zoom
    });

    this.marker();
  }

  //Latitud: 16.75, Longitud: -93.1167
  //latitud : 16.7534462,longitud: -93.1075127,15.42:zoom
  marker():void{
    var marker = new Mapboxgl.Marker()
    .setLngLat([-93.1075127,16.7534462])
    .addTo(this.map);
    //16.7446105,-93.1230412,15.42z
  }

}
