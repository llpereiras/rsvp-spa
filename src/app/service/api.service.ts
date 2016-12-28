import { Component } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Config } from './../config/config'

// export const ApiConfig = {
//   url: 'http://localhost:3000/',
//   endpoint: {
//     login: 'auth_user'
//   }};



@Injectable()
// export const ApiConfig = {
//   url: 'http://localhost:3000/',
//   endpoint: {
//     login: 'auth_user'
//   }};


export class ApiService {

  public config: {};

  constructor(private http: Http, @Inject('Config') private Config: Config){
    this.config = Config.getConfig();
  }

  public authenticate (user) {
    console.log(this.config);
    // console.log(this.config.url);
    debugger;
    // , user
    // return this.http.post(this.config.url + this.config.endpoint.login, user)
    //   .map((data: any) => data.json());
  }

}
