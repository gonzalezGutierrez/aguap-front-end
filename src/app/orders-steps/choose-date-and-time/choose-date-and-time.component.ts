import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-date-and-time',
  templateUrl: './choose-date-and-time.component.html',
  styleUrls: ['./choose-date-and-time.component.css']
})
export class ChooseDateAndTimeComponent implements OnInit {

    time: string;

    constructor() { }

    ngOnInit() {

    }

    onChooseTimeAndDate() {
        alert(this.time);
    }

}
