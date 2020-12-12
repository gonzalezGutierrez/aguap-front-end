import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/services/orden.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-order-current',
    templateUrl: './order-current.component.html',
    styleUrls: ['./order-current.component.css']
})
export class OrderCurrentComponent implements OnInit {

    order: any = {};
    total: number;
    servicios: any = [];
    constructor(private orderService:OrdenService, private router:Router) { }

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

    confirm_order(){
        this.router.navigate(['/user']);
    }
}
