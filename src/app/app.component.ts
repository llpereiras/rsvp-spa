import { Component } from '@angular/core';
import { Router }  from '@angular/router';
import { SessionStorageService } from 'ng2-webstorage';
import { Injectable} from '@angular/core';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Sistema RSVP';
  usuario_logado: boolean;
  usuario_nome = '';

  constructor(private sessionSt:SessionStorageService, private router: Router) {
    this.usuario_logado = false;
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.sessionSt.retrieve("token") == null) {
        this.router.navigate(['login']);
        return false;
      }
      this.usuario_logado = true;
      this.usuario_nome = this.sessionSt.retrieve('token').user.email;
    });
  }

  deslogar(){
    this.sessionSt.clear("token");
    this.router.navigate(['login']);
  }
}
