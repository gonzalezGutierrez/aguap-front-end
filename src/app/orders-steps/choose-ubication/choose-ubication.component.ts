import { Component, OnInit } from '@angular/core';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-choose-ubication',
  templateUrl: './choose-ubication.component.html',
  styleUrls: ['./choose-ubication.component.css']
})
export class ChooseUbicationComponent implements OnInit {

    ubicaciones: any = [];
    constructor(
        private ubicacionService: UbicacionesService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.getUbicaciones();
    }


    getUbicaciones() {
        this.spinner.show();
        this.ubicacionService.getUbicaciones().subscribe((result: any) => {
            this.ubicaciones = result.ubicaciones;
            this.spinner.hide();
        });
    }

    onChooseUbication(idUbication) {
        alert(idUbication);
    }

}
