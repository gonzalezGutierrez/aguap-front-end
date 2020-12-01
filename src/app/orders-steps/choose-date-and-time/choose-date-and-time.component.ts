import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/services/orden.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-choose-date-and-time',
  templateUrl: './choose-date-and-time.component.html',
  styleUrls: ['./choose-date-and-time.component.css']
})
export class ChooseDateAndTimeComponent implements OnInit {

    time: string;

    constructor(
        private orderService: OrdenService,
        private spinner: NgxSpinnerService

    ) { }

    ngOnInit() {

    }

    onChooseTimeAndDate() {
        this.spinner.show();
        this.orderService.updateFechaOrden(this.time).subscribe((result) => {
            this.spinner.hide();
        });
    }

}
