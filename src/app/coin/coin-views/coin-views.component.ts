import { Component, OnInit } from '@angular/core';
import {CoinService}from '../../service/coin.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retryWhen, retry} from 'rxjs/operators'
import * as XLSX from 'xlsx';
import {SearchService } from '../search/search.service';
import { MatTableDataSource } from '@angular/material/table';
// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
export interface PeriodicElement {
  name: string;
  price: number;

}
import {AfterViewInit,  ViewChild} from '@angular/core';
@Component({
  selector: 'app-coin-views',
  templateUrl: './coin-views.component.html',
  styleUrls: ['./coin-views.component.css']
})


export class CoinViewsComponent implements OnInit {
  coins = [];
  coinData : any;
  pageLength: any;

  displayedColumns: string[] = ['name', 'price', 'create','update','action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.coinData.paginator = this.paginator;
  // }
  fileName= 'ExcelSheet.xlsx';


  constructor(private http: HttpClient,
              private cs: CoinService,
              private route: ActivatedRoute,
              private router: Router,) { }
              public searchService: SearchService;
              public loading : boolean;
              public searchTerm = new Subject<string>();
              public searchResults: any;
              public paginationElements: any;
              public errorMessage: any;
              public searchForm = new FormGroup({
                search: new FormControl("", Validators.required)
              })

  ngOnInit(): void {
    this.getCoins();
  }
getCoins(){
    this.cs.getCoins().subscribe((res: any[]) =>{
      this.coins = res;
      this.pageLength = res.length;

      this.coinData = new MatTableDataSource(this.coins);
      this.coinData.paginator = this.paginator;
      console.log(this.coins);
    });

  }

  deleteCoin(id) {
    this.cs.deleteCoin(id).subscribe(res => {
      this.router.navigate(['coins']);
      console.log('Deleted');
    });
}


exportexcel(): void
{
  /* pass here the table id */
  let element = document.getElementById('excel-table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, this.fileName);

}



}
