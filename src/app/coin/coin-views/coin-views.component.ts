import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../service/coin.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  retryWhen,
  retry,
} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { SearchService } from '../search/search.service';
import { MatTableDataSource } from '@angular/material/table';
// import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
export interface PeriodicElement {
  name: string;
  price: number;
}
import { AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-coin-views',
  templateUrl: './coin-views.component.html',
  styleUrls: ['./coin-views.component.css'],
})
export class CoinViewsComponent implements OnInit {
  coins = [];
  coinData: any;
  pageLength: any;

  displayedColumns: string[] = ['name', 'price', 'create', 'update', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.coinData.paginator = this.paginator;
  // }
  fileName = 'ExcelSheet.xlsx';

  constructor(
    private http: HttpClient,
    private cs: CoinService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public searchService: SearchService;
  public loading: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  coinSearch: string = '';
  coinQuery = {
    name: ''
  }
  ngOnInit(): void {
    // this.getCoins();
    this.initCoins();
  }
  // getCoins() {
  //   this.cs.getCoins().subscribe((res: any[]) => {
  //     this.coins = res;
  //     this.pageLength = res.length;

  //     this.coinData = new MatTableDataSource(this.coins);
  //     this.coinData.paginator = this.paginator;
  //     console.log(this.coins);
  //   });
  // }

  async initCoins() {
    await this.getCoin(this.coinQuery.name).then(data => {
      this.coins = data;
      this.pageLength = data.length;
      this.coinData = new MatTableDataSource(this.coins);
      this.coinData.paginator = this.paginator;

    }).catch(err => {
      // error code
    });
  }

    // API functions
    getCoin(query?): Promise<any> {
      return new Promise((resolve, reject) => {
        this.cs.getCoins(query)
          .subscribe(response => {
            if (response) {
              resolve(response);
            }
          }, err => {
            if (err) {
              reject(reject);
            }
          });
      });
    }

    onKeyup(e:any){
      if (this.coinSearch !== '') {
        this.coinQuery.name = `/search?name=${this.coinSearch}`;
        this.initCoins();
      } else {
        this.coinQuery.name = '';
        this.initCoins();
      }

    }
  onDeleteCoin(id) {
    this.cs.deleteCoin(id).subscribe((res) => {
      this.router.navigate(['coins']);
      console.log('Deleted');
    });
  }

  onEditCoin(id) {
    // console.log(id);
    // console.log(this.router);
    // this.router.navigate([`/edit/${id}`]);
  }

  onExportExcel() {
    let reportsArr;
    let counter = 0;
    let today = String(new Date());
    today = today.slice(0, 24);
    let selectedCoins = [];

    for (let i = 0; i < this.coins.length; i++) {
      selectedCoins.push({
        _id: this.coins[i]._id,
        name: this.coins[i].name,
        price: this.coins[i].price,
      });
    }

    // for (let i = 0; i < this.checkboxNumber.length; i++) {
    //   selectedCampaigns.push({
    //     status: this.checkboxNumber[i].campaignStatus,
    //     campaignName: this.checkboxNumber[i].name,
    //     advertiser: this.checkboxNumber[i].advertiserData,
    //     startDate: this.checkboxNumber[i].startDate,
    //     endDate: this.checkboxNumber[i].endDate,
    //     mediaStatus: this.checkboxNumber[i].mediaStatus,
    //     budget: this.checkboxNumber[i].budget,
    //     percentageDelivered: (this.checkboxNumber[i].exposure / this.checkboxNumber[i].estimatedExposure) * 100,
    //     adsPlay: this.checkboxNumber[i].exposure
    //   })
    // }
    // if (selectedCampaigns.length < 1) {
    //   this.snackBar.open('Report Empty, Please select different campaigns', 'close', {
    //     duration: 3000
    //   });
    // } else if (selectedCampaigns.length > 1000) {
    //   reportsArr = selectedCampaigns;
    //   while (reportsArr.length > 0) {
    //     this.cs.exportExcel(reportsArr.splice(0, 1000), `Campaign(${counter}) ${today}`);
    //     counter++;
    //   }
    // } else {
    //   this.cs.exportExcel(selectedCampaigns, `Campaign ${today}`);
    // }
    console.log(this.coinData)
    this.cs.exportExcel(selectedCoins, `Coins ${today}`);
  }
}
