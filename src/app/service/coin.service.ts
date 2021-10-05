import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Coin from '../models/Coin';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  uri = environment.apiUrl;
  result: any;
  searchresult: any;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // uri = 'http://localhost:4001/coins'

  handleError: any;
  constructor( private http: HttpClient) { }
  addCoin(name, price) {
    // const uri = 'http://localhost:4001/coins/add';
    const obj = {
      name: name,
      price: price
    };
    this.http.post(`${this.uri}/coins/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getCoins(query) {
    return this.http.get(`${this.uri}/coins${query ? query : ''}`);
  }




  editCoin(id) {
    console.log(id);
    return this
            .http
            .get(`${this.uri}/coins/edit/${id}`);

    }

  updateCoin(name, price, id) {



    const obj = {
      name: name,
      price: price
    };
    this
      .http
      .post(`${this.uri}/coins/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
  deleteCoin(id) {
      // const uri = 'http://localhost:4001/coins/delete/' + id;

          return this
              .http
              .get(`${this.uri}/coins/delete/${id}`)
              .map(res => {
                return res;
              });
    }


    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';
    public exportExcel(jsonData: any[], fileName: string): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
      const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, fileName);
    }
    private saveExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: this.fileType});
      FileSaver.saveAs(data, fileName + this.fileExtension);
    }



}

