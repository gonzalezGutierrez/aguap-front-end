import { Component, OnInit } from '@angular/core';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { NgxSpinnerService } from "ngx-spinner";
import { OrdenService } from 'src/app/services/orden.service';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService} from 'src/app/usuarios.service';
@Component({
  selector: 'app-choose-ubication',
  templateUrl: './choose-ubication.component.html',
  styleUrls: ['./choose-ubication.component.css']
})
export class ChooseUbicationComponent implements OnInit {
    map: Mapboxgl.Map;
    ubicaciones: any = [];
    latitud:number;
    longitud:number;
    addrees:string;
    marker
    public formGroup = new FormGroup({

        address: new FormControl('', [
            Validators.required,
        ])

    });
    constructor(
        private ubicacionService: UbicacionesService,
        private spinner: NgxSpinnerService,
        private orderService: OrdenService,
        private router:Router,
        private usuarioService:UsuariosService
    ) { }

    ngOnInit() {
        //this.getUbicaciones();
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
        //console.log(e.lngLat.lat, e.lngLat.lng)
        if(this.marker != null){
            this.marker.remove()
        }
        this.Marcador(e.lngLat.lng, e.lngLat.lat)
        this.getAddrees(e.lngLat.lng, e.lngLat.lat)
        });
    }

    Marcador(lng: number, lat: number){
        //console.log(lng, lat)
        this.marker = new Mapboxgl.Marker({
          draggable: true,
          color: 'green'
          }).setLngLat([lng, lat]).addTo( this.map );

        this.marker.on('drag', () => {
          //console.log(this.marker.getLngLat());
          this.getAddrees(this.marker.getLngLat().lng, this.marker.getLngLat().lat);
          });
      }
    
      getAddrees(lng: number, lat: number){
        this.latitud = 0.0;
        this.longitud = 0.0;
        this.addrees = '';
        this.usuarioService.getAddress(lng, lat).subscribe((data:any) => {
          //console.log(data.features[0].place_name);
          this.latitud = lat;
          this.longitud = lng;
          this.addrees = data.features[0].place_name;
          this.formGroup.controls.address.setValue(data.features[0].place_name);
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
          trackUserLocation: true,
          showUserLocation: false
          })
        this.map.addControl(geo)
        geo.on('geolocate', function(position){
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            //console.log('lat, lng', this.latitude, this.longitude);
        });
      }

    newLocation(){
        console.log('direccion ::> ',this.addrees, 'Latitud ::> ',this.latitud, 'Longitud ::> ',this.longitud)
    }

    getUbicaciones() {
        this.spinner.show();
        this.ubicacionService.getUbicaciones().subscribe((result: any) => {
            this.ubicaciones = result.ubicaciones;
            this.spinner.hide();
        });
    }

    onChooseUbication(idUbication) {
        this.spinner.show();
        this.orderService.updateUbicacion(idUbication).subscribe((result:any) => {
            this.spinner.hide();
            alert(result.msg);
            this.router.navigate(['/order-steps/repartidores']);
        });
    }
}
