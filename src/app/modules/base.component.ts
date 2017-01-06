import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { SessionStorageService } from 'ng2-webstorage';
import { ServiceLocator } from './../service_locator';

export class BaseComponent {

  saving: boolean = false;
  protected _api: any;
  protected _router: any;
  protected _sessionSt:any;

  constructor() {
    this._api = ServiceLocator.injector.get(ApiService);
    this._router = ServiceLocator.injector.get(Router);
    this._sessionSt = ServiceLocator.injector.get(SessionStorageService);
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

}
