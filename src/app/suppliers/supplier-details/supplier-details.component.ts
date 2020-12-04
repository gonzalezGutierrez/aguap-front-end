import { Component, OnInit, Input } from '@angular/core';
import { Suppliers } from 'src/app/models/supliers';
import { SupplierService } from 'src/app/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierListComponent } from 'src/app/suppliers/supplier-list/supplier-list.component';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  id:number;
  supplier: Suppliers;
  constructor(private route: ActivatedRoute,private router: Router, private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplier = new Suppliers();
    this.id = this.route.snapshot.params['id'];
    this.supplierService.getSupplier(this.id).subscribe(
      data => {
        console.log(data)
        this.supplier = data;
      }, error => console.log(error));
  }
  list(){
    this.router.navigate(['/suppliersList']);
  }
}
