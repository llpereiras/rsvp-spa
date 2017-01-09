import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CredencialForm } from './credenciais.form';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './credenciais.save.html'
})
export class CredencialCreateComponent extends BaseComponent{
  title = 'Credencial Novo';
  credencial: any = {};
  formCredencial: any;

  constructor(credencialform:CredencialForm){
    super();
    this.formCredencial = credencialform.getForm();
  }

  save () {
    this.saving = true;
    this.credencial = {"credencial": this.formCredencial.value};
    this.api.createCredenciais(this.credencial).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Credencial salva com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['credenciais']);
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Credencial não foi salva!', { cssClass: 'alert-warning', timeout: 5000 });
          let response = JSON.parse(err._body);
          for (let field of Object.keys(response)) {
            this.flashMessagesService.show('Campo ' + field + ': ' + response[field], { cssClass: 'alert-danger', timeout: 10000 });
          }
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
