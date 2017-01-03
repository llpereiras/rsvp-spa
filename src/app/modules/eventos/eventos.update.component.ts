import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  templateUrl: './eventos.create.component.html'
})
export class EventoUpdateComponent {
  title = 'Evento Novo';
  evento: any = {};
  formEvento: FormGroup;
  private api: ApiService;
  public mask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

  constructor(api: ApiService, fb: FormBuilder, private _flashMessagesService: FlashMessagesService, private route: ActivatedRoute){
    this.api = api;
    this.evento.id = "";
    this.evento.nome = "";
    this.evento.data = "";
    this.evento.vigente = "inativo";
    this.route.params
    .map(params => params['id'])
    .subscribe((id) => {
      this.api.getEventos(id).subscribe(
        (evento: any) => {
          this.evento = evento;
          this.formEvento.controls['id'].setValue(evento.id)
          this.formEvento.controls['nome'].setValue(evento.nome)
          this.formEvento.controls['data'].setValue(evento.data)
          this.formEvento.controls['vigente'].setValue(evento.vigente)
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
        () => console.log('Buscando evento n: ' + id) // complete
      );
      console.log(this.evento.nome)
      this.formEvento = fb.group({
        "id": [null],
        "nome": [null, Validators.required],
        "data": [null, Validators.required],
        "vigente": [null, Validators.required]
      });
    });
  }

  save () {
    this.evento = this.formEvento.value;
    console.log(this.evento)
    this.evento = {"evento": this.evento};
    this.api.updateEventos(this.evento).subscribe(
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
      },
      () => console.log('Listando eventos.') // complete
    );
  }

}
