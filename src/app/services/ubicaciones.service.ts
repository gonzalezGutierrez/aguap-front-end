import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../config/API';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  constructor(private http: HttpClient) { }

  getUbicaciones(token:string,idUser:number) {

    let endpoint = API_URL_LOCAL + '/ubicaciones?idUsuario='+idUser;
    return this.http.get(endpoint);
  }
  deleteUbicaciones(token:string,idUbicacion:number){
    let endpoint = API_URL_LOCAL + '/ubicaciones?idUbicacion='+idUbicacion;
    return this.http.delete(endpoint);
  }
  
}
