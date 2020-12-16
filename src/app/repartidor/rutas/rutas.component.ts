import { Component, OnInit } from '@angular/core';

import { icon, latLng, Map, Marker, point, polyline, Icon, tileLayer } from 'leaflet';
import * as L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})

export class RutasComponent  {
  ordenes:any;
  constructor(){
    this.ordenes= JSON.parse(localStorage.getItem('ordenes'));
    console.log("ordenes ",this.ordenes);
  }
// Mapa
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
// Segundo mapa
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

// Iniciar mapa
  options = {
    layers: [ this.wMaps],
    zoom: 14,
    center: latLng([ 16.7519593, -93.1254791 ])
  };

//Control de capas para mapas
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    }
  };

// Crear icono
  private defaultIcon: Icon = icon({
    iconUrl: "assets/marker-icon.png",
    shadowUrl: "assets/shadow-icon.png"
  });

  ngOnInit() {
    Marker.prototype.options.icon = this.defaultIcon;
  }

  onMapReady(map: L.Map) {
    L.Routing.control({
      waypoints: [
       L.latLng(16.760640, -93.131206), //inicio Depósito
       L.latLng(16.754023, -93.118924), //punto de entrega medio
       L.latLng(16.743943, -93.124644)], //punto de entrega final
      routeWhileDragging: false,
       //language: 'es'   //intrucciones en español
    }).addTo(map);      //cargar al mapa
  }

}