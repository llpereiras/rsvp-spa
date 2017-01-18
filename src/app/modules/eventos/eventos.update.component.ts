import { Component } from '@angular/core';
import { EventoForm } from './eventos.form';
import { BaseComponent } from './../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './eventos.save.html'
})
export class EventoUpdateComponent extends BaseComponent {
  title = 'Evento Novo';
  evento: any = {};
  formEvento: any;

  constructor(eventoform:EventoForm, activate_router: ActivatedRoute ){
    super()
    activate_router.params
    .map(params => params['id'])
    .subscribe((id) => {
      this.api.getEventos(id).subscribe(
        (evento: any) => {
          this.formEvento = eventoform.populate(evento);
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
      );
      this.formEvento = eventoform.getForm();
    });
  }

  save () {
    this.saving = true;
    this.evento = {"evento": this.formEvento.value};
    this.api.updateEventos(this.evento).subscribe(
      (data: any) => {
        this._flashMessagesService.show('Evento salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this._flashMessagesService.show('Evento não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
