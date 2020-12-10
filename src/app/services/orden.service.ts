import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../config/API';

@Injectable({
    providedIn: 'root'
})
export class OrdenService {

    constructor(private http: HttpClient) { }

    getOrder() {
        let idUsuario = 11;
        let endpoint = API_URL_LOCAL + `/orden?idUsuario=${idUsuario}`;
        return this.http.get(endpoint);
    }

    addOrder() {
        let idUsuario = 11;
        let endpoint = API_URL_LOCAL + `/ordenes?idUsuario=${idUsuario}`;
        return this.http.post(endpoint,{});
    }

    updateRepartidor(idRepartidor:number) {
        let idUsuario = 11;
        let endpoint  = API_URL_LOCAL + `/ordenes/update-repartidor?idUsuario=${idUsuario}`;
        return this.http.patch(endpoint, {
            idRepartidor:idRepartidor
        });
    }

    addUbicacion(address, long, lat){
        let location = {
            address: address,
            longitu: long,
            latitud: lat,
            add: true
        }
        let endpoint = API_URL_LOCAL + `/ordenes/add-servicio`;
        return this.http.post(endpoint, {
            location: location,
        });
    }

    updateUbicacion(idUbicacion:number) {
        let idUsuario = 11;
        let endpoint  = API_URL_LOCAL + `/ordenes/update-ubicacion?idUsuario=${idUsuario}`;
        return this.http.patch(endpoint, {
            idUbicacion:idUbicacion
        });
    }

    updateFechaOrden(fecha: string) {
        let idUsuario = 11;
        let endpoint  = API_URL_LOCAL + `/ordenes/update-fecha?idUsuario=${idUsuario}`;
        return this.http.patch(endpoint, {
            fecha:fecha
        });
    }

    addServicio(cantidad:number,idServicio:number) {
        let idUsuario = 11;
        let endpoint = API_URL_LOCAL + `/orden/add-servicio`;

        return this.http.post(endpoint, {
            idUsuario: idUsuario,
            cantidad: cantidad,
            idServicio: idServicio
        });
    }
}
