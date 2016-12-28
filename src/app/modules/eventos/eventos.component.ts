import { Component } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  templateUrl: './eventos.component.html'
})
export class EventoComponent {
  title = 'Eventos';
  eventos = [];
  private api: ApiService;

  constructor(api: ApiService){
    this.api = api;
    this.api.getEventos().subscribe(
      (data: any) => {
        this.eventos = data;
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados! Tente novamente.'); }},
      () => console.log('Listando eventos.') // complete
    );
  }

}
