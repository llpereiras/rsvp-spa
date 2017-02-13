import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from './../base.component';

@Component({
  selector: 'eventos-acompanhantes',
  templateUrl: './eventos_acompanhantes.component.html'
})

export class EventosAcompanhantesComponent extends BaseComponent{

  eventos_acompanhantes: any = [];
  credenciais: any = [];
  acompanhantes: any = [];
  evento_selecionado: {};
  convidado_pai: number;
  formEventoConvidado: any;
  acompanhante_selecionado: any;
  credencial_selecionada: any;
  @Input() convidado: number;

  ngOnInit() {
    // Realiza o bind da propriedade que vem da página de eventos_convidados
    // dmodules/eventos_convidados/eventos_convidados.component.html
    // O bind é realizado em <eventos-acompanhantes convidado="{{ec.convidado.id}}"></eventos-acompanhantes>
    this.convidado_pai = this.convidado;
  }

  constructor(activate_router: ActivatedRoute){
    super();
    this.title = 'Acompanhantes do evento: ';
    if (activate_router){
      activate_router.params
      .map(params => params['id'])
      .subscribe((evento_id) => {
        // Busca o evento selecionado
        this.api.getEventos(evento_id).subscribe(
          (evento: any) => {
            this.title = `Acompanhantes para o evento: ${evento.nome}` ;
            this.evento_selecionado = evento;
          },
          err => { if (err.status == 401) { alert('Impossível obter os dados do evento! Tente novamente.'); }}
        );

        this.get_acompanhantes(this.api);

        // // Busca todos os credenciais para filtrar
        this.api.getCredenciais().subscribe(
          (credenciais: any) => {
            this.credenciais = credenciais;
          },
          err => { if (err.status == 401) { alert('Impossível obter os dados credenciais! Tente novamente.'); }}
        );
      });
    }
  }

  get_acompanhantes(api) {
    // Busca todos os acompanhantes para filtrar
    api.getAcompanhantes().subscribe(
      (acompanhantes: any) => {
        this.acompanhantes = acompanhantes.map(function(c){
          return `${c.id} | ${c.nome} - ${c.email}`;
        });
      },
      err => { if (err.status == 401) { alert('Impossível obter os dados acompanhantes! Tente novamente.'); }}
    );
  }

  public updateListAcompanhantes(api) {
    this.recarregar_pagina();
  }

  add (evento_selecionado) {

    if (!this.acompanhante_selecionado) {
      alert('Convidado não selecionado');
      return false;
    }

    if (!this.credencial_selecionada) {
      alert('Credencial não selecionada');
      return false;
    }

    if (!this.convidado_pai) {
      alert('Convidado Principal não selecionado');
      return false;
    }

    this.saving = true;
    let evento_convidado = {
      "evento_convidado": {
        "evento_id": evento_selecionado.id,
        "credencial_id": this.credencial_selecionada,
        "convidado_id":  this.acompanhante_selecionado.split('|')[0],
        "convidado_pai":  this.convidado_pai
      }
    };

    this.api.createEventosConvidados(evento_convidado).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Convidado adicionado ao evento com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.recarregar_pagina();
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Evento não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
