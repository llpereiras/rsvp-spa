import { Component } from '@angular/core';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './convidados.component.html'
})
export class ConvidadoComponent extends BaseComponent{
  title = 'Convidados';
  convidados = [];

  constructor(){
    super();
    this.api.getRecurso('convidados').subscribe(
      (data: any) => {
        this.convidados = [];
        this.convidados = data;
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
    );
  }

  excluir(convidado_id) {
    let conf = confirm(`Confirma exclusão do convidado ${convidado_id}`);
    if (!conf) return false;
    this.api.deleteConvidados(convidado_id).subscribe(
      (data: any) => {
          this._flashMessagesService.show('Convidado excluído com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
          this._flashMessagesService.show('Atualizaremos a lista em alguns segundos!', { cssClass: 'alert-warning', timeout: 5000 });
          this.recarregar_pagina();
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando convidados.') // complete
    );
  }

}
