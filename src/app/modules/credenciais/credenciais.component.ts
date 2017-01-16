import { Component } from '@angular/core';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './credenciais.component.html'
})
export class CredencialComponent extends BaseComponent{
  title = 'Credenciais';
  credenciais = [];

  constructor(){
    super();
    this.api.getRecurso('credenciais').subscribe(
      (data: any) => {
        this.credenciais = [];
        this.credenciais = data;
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
    );
  }

  excluir(credencial_id) {
    let conf = confirm(`Confirma exclusão do credencial ${credencial_id}`);
    if (!conf) return false;
    this.api.deleteCredenciais(credencial_id).subscribe(
      (data: any) => {
          this._flashMessagesService.show('Credencial excluída com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
          this._flashMessagesService.show('Atualizaremos a lista em alguns segundos!', { cssClass: 'alert-warning', timeout: 5000 });
          this.recarregar_pagina();
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando credenciais.') // complete
    );
  }

}
