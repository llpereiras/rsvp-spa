import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { ApiConfig } from './../config/api.config'

@Injectable()
export class ApiService {

  constructor(@Inject(ApiConfig) private apiConfig: ApiConfig, private http: Http) {
    console.log("Injected config:", this.apiConfig);
  }

  public authenticate (user: any) {
    return this.http.post(this.apiConfig.url + this.apiConfig.endpoints.login, user)
      .map((data: any) => data.json());
  }

}
