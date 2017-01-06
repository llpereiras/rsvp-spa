import { Component } from '@angular/core';
import { ConvidadoForm } from './convidados.form';
import { BaseComponent } from './../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './convidados.save.html'
})
export class ConvidadoUpdateComponent extends BaseComponent {
  title = 'Convidado Novo';
  convidado: any = {};
  formConvidado: any;

  constructor(convidadoform:ConvidadoForm, activate_router: ActivatedRoute ){
    super()
    activate_router.params
    .map(params => params['id'])
    .subscribe((id) => {
      this.api.getConvidados(id).subscribe(
        (convidado: any) => {
          this.formConvidado = convidadoform.populate(convidado);
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
      );
      this.formConvidado = convidadoform.getForm();
    });
  }

  save () {
    this.saving = true;
    this.convidado = {"convidado": this.formConvidado.value};
    this.api.updateConvidados(this.convidado).subscribe(
      (data: any) => {
        this._flashMessagesService.show('Convidado salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this._flashMessagesService.show('Convidado não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
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
