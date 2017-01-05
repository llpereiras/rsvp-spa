import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent extends BaseComponent{
  title = 'Login';
  user: Object = {};
  formLogin: FormGroup;

  constructor(fb: FormBuilder){
    super();
    this.formLogin = fb.group({
        "email": [null, Validators.required],
        "password": [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)]) ]
    });
  }

  logar(){
    this.user = this.formLogin.value;
    this.saving = true;

    this.api.authenticate(this.user).subscribe(
      (data: any) => {
        this.sessionSt.store("token", data);
        this.router.navigate(['eventos']);
      },
      err => { if (err.status == 401) { alert('Login inválido! Tente novamente.'); }},
      () => {this.saving = false; console.log('Login efetuado com sucesso');} // complete
    );
  }

}
