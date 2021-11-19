import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  uri = environment.apiUrl
  constructor(private http: HttpClient) { }
  maxStudent(){
    return this
            .http
            .get(`${this.uri}/students/studentRecords`);
  }
}
