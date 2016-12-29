import { Component } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Home';
  usuario_nome = '';

  constructor(private sessionSt:SessionStorageService){
    // Verificar se é possível que a api retorne o nome
    this.usuario_nome = sessionSt.retrieve('token').user.email;
  }
}
