import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Supplies } from 'src/app/models/supplies';
import { SupplieService } from 'src/app/supplie.service';
import { SupplieListComponent } from 'src/app/supplies/supplie-list/supplie-list.component';

@Component({
  selector: 'app-supplie-details',
  templateUrl: './supplie-details.component.html',
  styleUrls: ['./supplie-details.component.css']
})
export class SupplieDetailsComponent implements OnInit {
  id:number;
  supplie: Supplies;
  constructor(private route: ActivatedRoute,private router: Router, 
    private supplieService: SupplieService) { }

  ngOnInit() {
    this.supplie = new Supplies();
    this.id = this.route.snapshot.params['id'];
    this.supplieService.getSupplie(this.id).subscribe(
      data => {
        console.log(data)
        this.supplie = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['/']);
  }
}
