import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-deliverer',
  templateUrl: './register-deliverer.component.html',
  styleUrls: ['./register-deliverer.component.css']
})
export class RegisterDelivererComponent implements OnInit {
  hide=true;
  user_idRol:number=2;
  constructor() {
  }
  
  ngOnInit() {
  }

}
