import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-ubications',
  templateUrl: './my-ubications.component.html',
  styleUrls: ['./my-ubications.component.css']
})
export class MyUbicationsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 7, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 8, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 9, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},

];