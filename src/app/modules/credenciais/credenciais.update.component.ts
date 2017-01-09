import { Component } from '@angular/core';
import { CredencialForm } from './credenciais.form';
import { BaseComponent } from './../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './credenciais.save.html'
})
export class CredencialUpdateComponent extends BaseComponent {
  title = 'Credencial Novo';
  credencial: any = {};
  formCredencial: any;

  constructor(credencialform:CredencialForm, activate_router: ActivatedRoute ){
    super()
    activate_router.params
    .map(params => params['id'])
    .subscribe((id) => {
      this.api.getCredenciais(id).subscribe(
        (credencial: any) => {
          this.formCredencial = credencialform.populate(credencial);
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
      );
      this.formCredencial = credencialform.getForm();
    });
  }

  save () {
    this.saving = true;
    this.credencial = {"credencial": this.formCredencial.value};
    this.api.updateCredenciais(this.credencial).subscribe(
      (data: any) => {
        this._flashMessagesService.show('Credencial salva com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this._flashMessagesService.show('Credencial não foi salva!', { cssClass: 'alert-warning', timeout: 5000 });
          let response = JSON.parse(err._body);
          for (let field of Object.keys(response)) {
            this._flashMessagesService.show('Campo ' + field + ': ' + response[field], { cssClass: 'alert-danger', timeout: 10000 });
          }
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
