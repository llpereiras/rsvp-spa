import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { SessionStorageService } from 'ng2-webstorage';
import { ServiceLocator } from './../service_locator';
import { FlashMessagesService } from 'angular2-flash-messages';

export class BaseComponent {

  saving: boolean = false;
  protected _api: any;
  protected _router: any;
  protected _sessionSt:any;
  protected title:string = '';
  protected _flashMessagesService:any;
  public _data_mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

  constructor() {
    this._api = ServiceLocator.injector.get(ApiService);
    this._router = ServiceLocator.injector.get(Router);
    this._sessionSt = ServiceLocator.injector.get(SessionStorageService);
    this._flashMessagesService = ServiceLocator.injector.get(FlashMessagesService);
  }

  get api(): ApiService {
    return this._api;
  }

  get router(): Router {
    return this._router;
  }

  get sessionSt(): SessionStorageService {
    return this._sessionSt;
  }

  get flashMessagesService(): FlashMessagesService {
    return this._flashMessagesService;
  }

  get data_mask(): any {
    return this._data_mask;
  }

  recarregar_pagina(tempo_relogar: number = 2000){
    setTimeout(() => {
      location.reload(); // Adicionado para forçar nova requisição e evitar cache
    }, tempo_relogar);
  }

  ver_erros_retorno(_body) {
    let response = JSON.parse(_body);
    for (let field of Object.keys(response)) {
      this.flashMessagesService.show(`${field}: ${response[field]}`, { cssClass: 'alert-danger', timeout: 10000 });
    }
  }

}
