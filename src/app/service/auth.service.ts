
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _registerUrl = environment.apiUrl;
  _loginUrl = environment.apiUrl;

  // private _registerUrl = "http://localhost:4001/users/register";
  // private _loginUrl = "http://localhost:4001/users/login";

  constructor( private http: HttpClient,
    private _router : Router) { }

registerUser(email, password) {

  const obj = {
    email: email,
    password: password,
     };
     console.log(obj);
     this.http.post(`${this._registerUrl}/users/register`, obj)
   .subscribe(res => console.log('registered sucess'));

}

loginUser(user){
return this.http.post<any>(`${this._loginUrl}/users/login`, user)
}

loggedIn(){
return !!localStorage.getItem('token')
}

getToken(){
return localStorage.getItem('auth_tkn')
this._router.navigate(['/products'])
}

  logoutUser(){
  localStorage.removeItem('token')
  }
}
