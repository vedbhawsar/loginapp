import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {LoginService} from "../shared/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  response:any={};
  message:String = "";
  status:String = "danger";
  constructor(public loginService: LoginService) { }
 
  ngOnInit() {
  }

  onSubmit(form?:NgForm){
    if(form){      
      this.loginService.postLogin().subscribe((res) => {
        this.response = res;
        if(!this.response.success){
          this.message = this.response.message;
          this.status = "danger";
        }else{
           this.message = this.response.message;
           this.status = "success";
           this.loginService.setToken(this.response.token);
        }
      },
      (err)=>{
        
        this.message = err.statusText+": "+err.error.message;
      })
    }
  }
}
