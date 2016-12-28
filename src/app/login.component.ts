import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ApiService } from './service/api.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'Login!';

  user: Object = {};

  formLogin: FormGroup;

  private api: ApiService;

  public session = { "status": "Não logado" };

  constructor(private router: Router, fb: FormBuilder, api: ApiService){
    this.api = api;
    this.formLogin = fb.group({
        "email": [null, Validators.required],
        "password": [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]) ]
    });
  }

  logar(){
    this.api.authenticate(this.formLogin.value).subscribe(
      (data: any) => {
        this.session = data;
      },
      err => { if (err.status == 401) { alert('Login inválido! Tente novamente.'); }},
      () => console.log('Login efetuado com sucesso') // complete
    );
  }



}
