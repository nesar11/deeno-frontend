import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdunitService {

  // uri = 'http://localhost:4001/adunits';
  uri = environment.apiUrl

  constructor(private http: HttpClient) { }

  addAdUnit(unit_name, unit_price) {
    const obj = {
      unit_name: unit_name,
      unit_price: unit_price
    };
    this.http.post(`${this.uri}/adunits/add`, obj)
        .subscribe(res => console.log('Done'));
  }

getAdUnits() {
  return this
         .http
         .get(`${this.uri}/adunits`);
  }

editAdUnit(id) {
    return this
              .http
              .get(`${this.uri}/adunits/edit/${id}`);
    }

updateAdUnit(unit_name, unit_price, id) {

      const obj = {
        unit_name: unit_name,
        unit_price: unit_price
      };
      this
        .http
        .post(`${this.uri}/adunits/update/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }


  deleteAdUnit(id) {
      return this
                .http
                .get(`${this.uri}/adunits/delete/${id}`);
  }
  maxAdunit(){
    return this
            .http
            .get(`${this.uri}/adunits/maxAd`);
  }
}

