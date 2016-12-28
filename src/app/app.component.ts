import { Component  } from '@angular/core';
import { Router }  from '@angular/router';
import { SessionStorageService } from 'ng2-webstorage';
import { Injectable} from '@angular/core';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';
  usuario_logado: boolean;

  constructor(private sessionSt:SessionStorageService, private router: Router) {
    this.usuario_logado = false;
    console.log(this.usuario_logado);
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.sessionSt.retrieve("token") == null) {
        this.router.navigate(['login']);
        return false;
      }
      this.usuario_logado = true;
    });
  }
}
