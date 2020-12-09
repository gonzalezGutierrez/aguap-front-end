import { Component, OnInit } from '@angular/core';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { NgxSpinnerService } from "ngx-spinner";
import { OrdenService } from 'src/app/services/orden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-ubication',
  templateUrl: './choose-ubication.component.html',
  styleUrls: ['./choose-ubication.component.css']
})
export class ChooseUbicationComponent implements OnInit {

    ubicaciones: any = [];
    constructor(
        private ubicacionService: UbicacionesService,
        private spinner: NgxSpinnerService,
        private orderService: OrdenService,
        private router:Router
    ) { }

    ngOnInit() {
        this.getUbicaciones();
    }


    getUbicaciones() {
        this.spinner.show();
        /*this.ubicacionService.getUbicaciones().subscribe((result: any) => {
            this.ubicaciones = result.ubicaciones;
            this.spinner.hide();
        });*/
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
