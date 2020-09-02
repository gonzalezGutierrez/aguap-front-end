import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public email;

  constructor(private http: HttpClient) { }

  set provando(p:String){
    console.log("hola perro estoy en el set xdxdddd");
  }

  getAddress(lng, lat){
    return this.http.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+lng+","+lat+".json?access_token="+environment.mapBoxkey)
  }

  logWithGoogle(email){
    this.email = email;
  }

}
