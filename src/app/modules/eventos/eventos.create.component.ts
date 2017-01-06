import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from './../../service/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventoForm } from './evento.form';

@Component({
  templateUrl: './eventos.create.component.html'
})
export class EventoCreateComponent {
  title = 'Evento Novo';
  evento: any = {};
  formEvento: any;
  private api: ApiService;
  public mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

  constructor(api: ApiService, eventoform:EventoForm, private _flashMessagesService: FlashMessagesService){
    this.api = api;
    this.formEvento = eventoform.getForm();
  }

  save () {
    this.evento = {"evento": this.formEvento.value};
    this.api.createEventos(this.evento).subscribe(
      (data: any) => {
        this._flashMessagesService.show('Evento salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
      },
      err => {
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this._flashMessagesService.show('Evento não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
          let response = JSON.parse(err._body);
          for (let field of Object.keys(response)) {
            this._flashMessagesService.show('Campo ' + field + ': ' + response[field], { cssClass: 'alert-danger', timeout: 10000 });
          }
          return false;
        }
      }
    );
  }

}
