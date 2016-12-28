import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {  } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'Login!';

  user: Object = {};

  formLogin: FormGroup;

  public session = { "status": "Não logado" };

  private apiUrl = 'https://hacker-news.firebaseio.com/v0/item/1000.json';  // URL to web API

  constructor(private router: Router, fb: FormBuilder, private http: Http){
    this.formLogin = fb.group({
        "username": [null, Validators.required],
        "password": [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]) ]
    });
  }

  logar(){
    console.log(this.formLogin);
    this.user = this.formLogin.value;
    console.log(this.user);

    this.getAuthenticate().subscribe(
      (data: any) => {
        this.session = data;
      },
      err => {console.log(err.status); console.log(err)},
      () => console.log('Login efetuado com sucesso') // complete
    );
  }

  getAuthenticate () {
    return this.http.get(this.apiUrl)
      .map((data: any) => data.json());
  }

}
