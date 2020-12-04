import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SupplierService } from 'src/app/supplier.service';
import { Router } from '@angular/router';
import { SupplierDetailsComponent } from 'src/app/suppliers/supplier-details/supplier-details.component';
import { Suppliers } from 'src/app/models/supliers';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  
  suppliers: Observable<Suppliers[]>;
  datos = [];
  zone: any = [];
  constructor(private supplierService: SupplierService, private router:Router) { }
  ngOnInit() {
    this.reloadData();
  }

  print(){
    console.log(this.datos)
  }

  changeDta(){

    this.datos.forEach(function(item){
      console.log(item.nombre)
      //item.nombre = 'boa';
    })
  }

  reloadData() {
    this.suppliers = this.supplierService.getSuppliers();
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.datos = data;
        this.print();
        this.changeDta();
      }
    )
  }

  deleteSupplier(id:number){
    this.supplierService.deleteSuppliers(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
  
  suppliersDetails(id:number){
    this.router.navigate(['/detailSupplier', id]);
  }

  updateSupplier(id: number){
    this.router.navigate(['/updateSupplier', id]);
  }

  add(){
    this.router.navigate(['/addSupplier']);
  }

  menu(){
    console.log(localStorage.getItem('send_email'));
    this.router.navigate(['user']);
  }
}
