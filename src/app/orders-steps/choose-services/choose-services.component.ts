import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-choose-services',
    templateUrl: './choose-services.component.html',
    styleUrls: ['./choose-services.component.css']
})
export class ChooseServicesComponent implements OnInit {

    servicios: any = [];
    constructor(
        private serviceService: ServicesService,
        private spinner: NgxSpinnerService
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

}
