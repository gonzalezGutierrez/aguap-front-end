import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { NgxSpinnerService } from "ngx-spinner";

import {FormControl, Validators, FormGroup} from '@angular/forms';
import { OrdenService } from 'src/app/services/orden.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-choose-services',
    templateUrl: './choose-services.component.html',
    styleUrls: ['./choose-services.component.css']
})
export class ChooseServicesComponent implements OnInit {

    servicios: any = [];

    cantidad: number;

    constructor(
        private serviceService: ServicesService,
        private orderService:   OrdenService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getServices();
    }

    getServices() {
        this.spinner.show();
        this.serviceService.getServices().subscribe((result:any) => {
            this.servicios = result.servicios;
            this.spinner.hide();
        });
    }

    onAdd(idServicio) {
        this.spinner.show();
        this.orderService.addServicio(this.cantidad, idServicio).subscribe(result => {
            this.spinner.hide();
            this.router.navigate(['/orders/order-current']);
        });
    }

}
