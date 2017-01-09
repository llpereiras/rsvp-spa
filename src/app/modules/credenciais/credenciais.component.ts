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

  new () {
    this.router.navigate(['credenciais/new']);
  }

  editar(convidado_id) {
    this.router.navigate(['credenciais/' + convidado_id]);
  }

  excluir(convidado_id) {
    let conf = confirm("Confirma exclusão do credencial " + convidado_id);
    if (!conf) return false;
    this.api.deleteCredenciais(convidado_id).subscribe(
      (data: any) => {
          this._flashMessagesService.show('Credencial excluída com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
          this._flashMessagesService.show('Atualizaremos a lista em alguns segundos!', { cssClass: 'alert-warning', timeout: 5000 });
          setTimeout(() => {
            location.reload(); // Adicionado para forçar nova requisição e evitar cache
          }, 2000);
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando credenciais.') // complete
    );
  }

}
