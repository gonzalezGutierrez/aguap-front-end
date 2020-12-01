import { Component, OnInit } from '@angular/core';
import { RepartidoresService } from 'src/app/services/repartidores.service';
import { NgxSpinnerService } from "ngx-spinner";
import { OrdenService } from 'src/app/services/orden.service';

@Component({
    selector: 'app-choose-repartidor',
    templateUrl: './choose-repartidor.component.html',
    styleUrls: ['./choose-repartidor.component.css']
})
export class ChooseRepartidorComponent implements OnInit {

    repartidores: any = [];
    records_numbers: number = 0;
    like: string;
    
    constructor(
        private repartidorService: RepartidoresService,
        private spinner: NgxSpinnerService,
        private orderService:OrdenService
    ) { }

    ngOnInit() {
        this.getRepartidores('');
    }

    getRepartidores(like:string) {
        this.spinner.show();
        this.repartidorService.getRepartidores(like).subscribe((result:any) => {
            this.records_numbers = result.records_number;
            this.repartidores = result.usuarios;
            this.spinner.hide();
        });
    }

    onSearchRepartidor() {
        this.getRepartidores(this.like);
    }

    onChooseRepartidor(idRepartidor) {
        this.spinner.show();
        this.orderService.updateRepartidor(idRepartidor).subscribe((result:any) => {
            alert(result.msg);
            this.spinner.hide();
        });
    }


}
