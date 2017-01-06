import { Component } from '@angular/core';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './eventos.component.html'
})
export class EventoComponent extends BaseComponent{
  title = 'Eventos';
  eventos = [];

  constructor(){
    super();
    this.api.getEventos().subscribe(
      (data: any) => {
        this.eventos = [];
        this.eventos = data;
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }}
    );
  }

  new () {
    this.router.navigate(['eventos/new']);
  }

  editar(evento_id) {
    this.router.navigate(['eventos/' + evento_id]);
  }

  excluir(evento_id) {
    let conf = confirm("Confirma exclusão do evento " + evento_id);
    if (!conf) return false;
    this.api.deleteEventos(evento_id).subscribe(
      (data: any) => {
          this._flashMessagesService.show('Evento excluído com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
          this._flashMessagesService.show('Atualizaremos a lista em alguns segundos!', { cssClass: 'alert-warning', timeout: 5000 });
          setTimeout(() => {
            location.reload(); // Adicionado para forçar nova requisição e evitar cache
          }, 2000);

      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando eventos.') // complete
    );
  }

}
