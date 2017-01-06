import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventoForm } from './eventos.form';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './eventos.save.html'
})
export class EventoCreateComponent extends BaseComponent{
  title = 'Evento Novo';
  evento: any = {};
  formEvento: any;

  constructor(eventoform:EventoForm){
    super();
    this.formEvento = eventoform.getForm();
  }

  save () {
    this.saving = true;
    this.evento = {"evento": this.formEvento.value};
    this.api.createEventos(this.evento).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Evento salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['eventos']);
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Evento não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
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
