import { Component } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  templateUrl: './eventos.component.html'
})
export class EventoComponent {
  title = 'Eventos';
  eventos = [];
  private api: ApiService;
  private router: Router;

  constructor(api: ApiService, router: Router, private _flashMessagesService: FlashMessagesService){
    this.api = api;
    this.router = router;
    this.api.getEventos().subscribe(
      (data: any) => {
        this.eventos = data;
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando eventos.') // complete
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
          this.router.navigate(['']);
          this._flashMessagesService.show('Evento excluído com sucesso!', { cssClass: 'alert-info', timeout: 5000 });
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando eventos.') // complete
    );
  }

}
