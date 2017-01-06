import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConvidadoForm } from './convidados.form';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './convidados.save.html'
})
export class ConvidadoCreateComponent extends BaseComponent{
  title = 'Convidado Novo';
  convidado: any = {};
  formConvidado: any;

  constructor(convidadoform:ConvidadoForm){
    super();
    this.formConvidado = convidadoform.getForm();
  }

  save () {
    this.saving = true;
    this.convidado = {"convidado": this.formConvidado.value};
    this.api.createConvidados(this.convidado).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Convidado salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['convidados']);
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Convidado não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
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
