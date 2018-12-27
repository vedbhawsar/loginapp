import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {LoginModel} from "./login.model"

@Injectable()
export class LoginService {
  loginuser=new LoginModel();
  logedinuser:LoginModel;
  readonly baseURL = 'http://localhost:5600/api/login'

  constructor(private _http:HttpClient) { }

  postLogin() {
    return this._http.post(this.baseURL, this.loginuser);
  }

  setToken(token:string){
    localStorage.setItem("token",token);
  }
  
}
