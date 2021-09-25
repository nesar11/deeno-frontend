import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  // uri = 'http://localhost:3000/business';
  uri=environment.apiUrl;

  constructor(private http: HttpClient) { }

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    this.http.post(`${this.uri}/business/add`, obj)
        .subscribe(res => console.log('Done'));
  }
  getBusinesses(){
    return this.http.get(`${this.uri}/business`);
  }

  editBusiness(id) {
    return this
            .http
            .get(`${this.uri}/business/edit/${id}`);
    }
updateBusiness(person_name, business_name, business_gst_number, id) {

      const obj = {
          person_name: person_name,
          business_name: business_name,
          business_gst_number: business_gst_number
        };
      this
        .http
        .post(`${this.uri}/business/update/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }
    deleteBusiness(id) {
      return this
                .http
                .get(`${this.uri}/business/delete/${id}`);
    }

}
