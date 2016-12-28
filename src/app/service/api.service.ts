import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { ApiConfig } from './../config/api.config';
import { SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class ApiService {

  constructor(@Inject(ApiConfig) private apiConfig: ApiConfig, private http: Http, private sessionSt:SessionStorageService) {
  }

  public authenticate (user: any) {
    return this.http.post(this.apiConfig.url + this.apiConfig.endpoints.login, user)
      .map((data: any) => data.json());
  }

  public createAuthorizationHeader(headers: Headers) {
    let token = this.sessionSt.retrieve("token").auth_token;
    headers.append('Authorization', 'Basic ' + `AUTH-BASIC ${token}`);
  }

  public getEventos () {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiConfig.url + this.apiConfig.endpoints.eventos, {
        headers: headers
      })
      .map((data: any) => data.json());
  }

}
