import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
    selector: 'app-order-current',
    templateUrl: './order-current.component.html',
    styleUrls: ['./order-current.component.css']
})
export class OrderCurrentComponent implements OnInit {

    order: any = {};
    total: number;
    servicios: any = [];
    constructor(private orderService:OrdenService) { }

    ngOnInit() {
        this.getOrder();
    }

    getOrder() {
        this.orderService.getOrder().subscribe((result:any) => {
            this.order     = result.order;
            this.total     = result.total;
            this.servicios = result.servicios;
        });
    }

}
