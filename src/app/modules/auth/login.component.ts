import { Component } from '@angular/core';
import { BaseComponent } from './../base.component';
import { LoginForm } from './login.form';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent extends BaseComponent{
  title = 'Login';
  user: Object = {};
  formLogin: any;

  constructor(loginform: LoginForm){
    super();
    this.formLogin = loginform.getForm();
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
      () => {this.saving = false;} // complete
    );
  }

}
