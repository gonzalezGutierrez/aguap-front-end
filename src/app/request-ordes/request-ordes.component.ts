import { Component, OnInit, Injectable  } from '@angular/core';
import {environment} from 'src/environments/environment.prod'; 
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { UsuariosService} from 'src/app/usuarios.service';

@Component({
  selector: 'app-request-ordes',
  templateUrl: './request-ordes.component.html',
  styleUrls: ['./request-ordes.component.css']
})
export class RequestOrdesComponent implements OnInit {
  map: Mapboxgl.Map;
  latitud:number
  longitud:number
  marker
  constructor(private usuarioService:UsuariosService) { 
    
  }

  ngOnInit() {
    (Mapboxgl as any).accessToken =environment.mapBoxkey
    this.map = new  Mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-93.1075127,16.7534462], // starting position LNG LT
    zoom:15.42// starting zoom
    });
    this.UbicacionCercana()
    this.map.addControl(new Mapboxgl.FullscreenControl());
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.on('click', (e) => {
      console.log(e.lngLat.lat, e.lngLat.lng)
      if(this.marker != null){
        this.marker.remove()
      }
      this.Marcador(e.lngLat.lng, e.lngLat.lat)
      this.getAddrees(e.lngLat.lng, e.lngLat.lat)
    });
  }
  Marcador(lng: number, lat: number){
    console.log(lng, lat)
    this.marker = new Mapboxgl.Marker({
      draggable: true
      }).setLngLat([lng, lat]).addTo( this.map );

    this.marker.on('drag', () => {
      console.log(this.marker.getLngLat());
      });
    console.log(this.marker)
  }

  getAddrees(lng: number, lat: number){
    console.log('geocoder ',lng, lat)
    this.usuarioService.getAddress(lng, lat).subscribe((data:any) => {
      console.log(data.features[0].place_name)
    })
  }

  UbicacionCercana(){
    const geo = new Mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true,
      },
      fitBoundsOptions: {
        maxZoom:15
      },
      trackUserLocation: false,
      showUserLocation: false
      })
    this.map.addControl(geo)
    geo.on('geolocate', function(position){
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('lat, lng', this.latitude, this.longitude);
    });
  }
}
