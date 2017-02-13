import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { ApiConfig } from './../config/api.config';
import { SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class ApiService {

  constructor(@Inject(ApiConfig) private apiConfig: ApiConfig, private http: Http, private sessionSt:SessionStorageService) {}

  public authenticate (user: any) {
    return this.http.post(this.apiConfig.url + this.apiConfig.endpoints.login, user)
      .map((data: any) => data.json());
  }

  public getRandom (){
    return Math.floor(Math.random() * (5000 - 1 + 1)) + 1;
  }

  public createAuthorizationHeader(headers: Headers) {
    let token = this.sessionSt.retrieve("token").auth_token;
    headers.append('Authorization', `Basic AUTH-BASIC ${token}`);
  }

  // Abstratas
  public getRecurso (recurso, recurso_id = 0) {
    let headers = new Headers();
    let url = this.apiConfig.url + this.apiConfig.endpoints[recurso];
    if ( recurso_id > 0 ) url = url + '/' + recurso_id;
    this.createAuthorizationHeader(headers);
    return this.http.get(`${url}?r=${this.getRandom()}` , {
        headers: headers
      })
      .map((data: any) => data.json());
  }

  public createRecurso (recurso, dados) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.apiConfig.url + this.apiConfig.endpoints[recurso], dados, {
        headers: headers
      })
      .map((data: any) => data.json());
  }

  public updateRecurso (recurso, recurso_id, dados) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiConfig.url + this.apiConfig.endpoints[recurso] + '/' + recurso_id, dados, {
        headers: headers
      })
      .map((data: any) => data.json());
  }

  public deleteRecurso (recurso, recurso_id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiConfig.url + this.apiConfig.endpoints[recurso] + '/' + recurso_id, {
        headers: headers
      })
      .map((data: any) => data.json());
  }

  // Get
  public getConvidados(convidado_id = 0){
    return this.getRecurso('convidados', convidado_id);
  }

  public getEventos (evento_id = 0) {
    return this.getRecurso('eventos', evento_id);
  }

  public getCredenciais (credenciais_id = 0) {
    return this.getRecurso('credenciais', credenciais_id);
  }

  public getEventosConvidados (evento_convidado_id = 0) {
    return this.getRecurso('eventos_convidados', evento_convidado_id);
  }

  public getEventosConvidadosByEvento (evento_id) {
    return this.getRecurso('eventos_convidados_by_evento', evento_id);
  }

  public getAcompanhantes(acompanhante_id = 0){
    return this.getRecurso('acompanhantes', acompanhante_id);
  }

  // Create
  public createEventos (evento) {
    return this.createRecurso('eventos', evento);
  }

  public createConvidados (convidado) {
    return this.createRecurso('convidados', convidado);
  }

  public createCredenciais (credencial) {
    return this.createRecurso('credenciais', credencial);
  }

  public createEventosConvidados (evento_convidado) {
    return this.createRecurso('eventos_convidados', evento_convidado);
  }

  // Update
  public updateEventos (evento) {
    return this.updateRecurso('eventos', evento.evento.id, evento);
  }

  public updateConvidados (convidado) {
    return this.updateRecurso('convidados', convidado.convidado.id, convidado);
  }

  public updateCredenciais (credencial) {
    return this.updateRecurso('credenciais', credencial.credencial.id, credencial);
  }

  public confirmarEventosConvidados (evento_convidado_id) {
    return this.updateRecurso('eventos_convidados_confirmar', evento_convidado_id, {});
  }

  public registrarPresencaEventosConvidados (evento_convidado_id) {
    return this.updateRecurso('eventos_convidados_registrar_presenca', evento_convidado_id, {});
  }

  // Delete
  public deleteEventos (evento_id) {
    return this.deleteRecurso('eventos', evento_id);
  }

  public deleteConvidados (convidado_id) {
    return this.deleteRecurso('convidados', convidado_id);
  }

  public deleteCredenciais (credencial_id) {
    return this.deleteRecurso('credenciais', credencial_id);
  }

  public deleteEventosConvidados (evento_convidado_id) {
    return this.deleteRecurso('eventos_convidados', evento_convidado_id);
  }
}
