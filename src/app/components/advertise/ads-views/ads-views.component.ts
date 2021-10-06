import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AdunitService} from '../../../service/adunit.service';
import { AdUnit } from '../../../models/AdUnit';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-ads-views',
  templateUrl: './ads-views.component.html',
  styleUrls: ['./ads-views.component.css']
})
export class AdsViewsComponent implements OnInit {
  adunits: AdUnit[];
adData : any;
pageLength: any;
displayedColumns: string[] = ['unit_name', 'unit_price', 'create', 'action'];
@ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private adunitservice: AdunitService,
              private http : HttpClient) { }

  ngOnInit() {
    this.adunitservice
      .getAdUnits()
      .subscribe((data: AdUnit[]) => {
      this.adunits = data;
      console.log(data);
      this.pageLength = data.length;
      this.adData = new MatTableDataSource(this.adunits);
      this.adData.paginator = this.paginator;
    });
  }

// async initAds(){
//   await this.
// }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.adData.filter = filterValue.trim().toLowerCase();
}


  deleteAdUnit(id) {
    this.adunitservice.deleteAdUnit(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
