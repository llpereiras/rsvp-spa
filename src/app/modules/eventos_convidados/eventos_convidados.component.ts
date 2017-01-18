import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from './../base.component';

@Component({
  templateUrl: './eventos_convidados.component.html'
})
export class EventosConvidadosComponent extends BaseComponent{

  eventos_convidados: any = [];
  credenciais: any = [];
  convidados: any = [];
  evento_selecionado: {};
  formEventoConvidado: any;
  convidado_selecionado: any;
  credencial_selecionada: any;

  constructor(activate_router: ActivatedRoute ){
    super();
    this.title = 'Convidados do evento: ';
    activate_router.params
    .map(params => params['id'])
    .subscribe((evento_id) => {
      // Busca o evento selecionado
      this.api.getEventos(evento_id).subscribe(
        (evento: any) => {
          this.title = `Convidados para o evento: ${evento.nome}` ;
          this.evento_selecionado = evento;
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados do evento! Tente novamente.'); }}
      );

      // Busca os convidados do evento selecionado
      this.api.getEventosConvidados().subscribe(
        (eventos_convidados: any) => {
          this.eventos_convidados = eventos_convidados;
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados do evento! Tente novamente.'); }}
      );

      // Busca todos os convidados para filtrar
      this.api.getConvidados().subscribe(
        (convidados: any) => {
          this.convidados = convidados.map(function(c){
            return `${c.id} | ${c.nome} - ${c.email}`;
          });
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados convidados! Tente novamente.'); }}
      );

      // Busca todos os credenciais para filtrar
      this.api.getCredenciais().subscribe(
        (credenciais: any) => {
          this.credenciais = credenciais;
        },
        err => { if (err.status == 401) { alert('Impossível obter os dados credenciais! Tente novamente.'); }}
      );
    });
  }

  add (evento_selecionado) {

    if (!this.convidado_selecionado) {
      alert('Convidado não selecionado');
      return false;
    }

    if (!this.credencial_selecionada) {
      alert('Credencial não selecionada');
      return false;
    }

    this.saving = true;
    let evento_convidado = {
      "evento_convidado": {
        "evento_id": evento_selecionado.id,
        "credencial_id": this.credencial_selecionada,
        "convidado_id":  this.convidado_selecionado.split('|')[0]
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

  confirmar_presenca(evento_convidado_id) {
    let conf = confirm("Registrar Confirmação do convidado neste evento? ");
    if (!conf) return false;
    this.api.confirmarEventosConvidados(evento_convidado_id).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Confirmação do convite do convidado registrada com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.recarregar_pagina();
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Problemas ao registrar alteração!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

  marcar_hora(evento_convidado_id) {

    let conf = confirm("Registrar Confirmação do convidado neste evento? ");
    if (!conf) return false;
    this.api.registrarPresencaEventosConvidados(evento_convidado_id).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Hora de cegada do convidado registrada com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.recarregar_pagina();
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Problemas ao registrar alteração!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );

  }

  excluir(evento_convidado_id) {
    let conf = confirm("Confirma exclusão do convidado deste evento");
    if (!conf) return false;
    this.api.deleteEventosConvidados(evento_convidado_id).subscribe(
      (data: any) => {
        this.flashMessagesService.show('Convidado retirado do evento com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
        this.recarregar_pagina();
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Evento/Convidado não salvo!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
