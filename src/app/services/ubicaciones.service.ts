import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../config/API';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

    constructor(private http: HttpClient) { }

    getUbicaciones() {
        let endpoint = API_URL_LOCAL + '/ubicaciones?idUsuario=20';
        return this.http.get(endpoint);
    }
}
