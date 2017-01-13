//----------------------------------------------------------------------------
//Modules
//----------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ng2-webstorage';
import { TextMaskModule } from 'angular2-text-mask';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DatePipe } from '@angular/common';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

//----------------------------------------------------------------------------
//Components Core
//----------------------------------------------------------------------------
import { AppComponent } from './app.component';
import { Injector } from "@angular/core";
import { ServiceLocator } from './service_locator';
import { BaseComponent } from './modules/base.component';
import { CapitalizePipe } from './pipes/capitalize';

// Module Auth
import { LoginComponent } from './modules/auth/login.component';
import { LoginForm } from './modules/auth/login.form';

// Module Home
import { HomeComponent } from './modules/home/home.component';

// Module Eventos
import { EventoComponent } from './modules/eventos/eventos.component';
import { EventoCreateComponent } from './modules/eventos/eventos.create.component';
import { EventoUpdateComponent } from './modules/eventos/eventos.update.component';
import { EventoForm } from './modules/eventos/eventos.form';
import { EventosStatusPipe } from './pipes/eventos.status';

// Module Convidado
import { ConvidadoComponent } from './modules/convidados/convidados.component';
import { ConvidadoCreateComponent } from './modules/convidados/convidados.create.component';
import { ConvidadoUpdateComponent } from './modules/convidados/convidados.update.component';
import { ConvidadoForm } from './modules/convidados/convidados.form';

// Module Credencial
import { CredencialComponent } from './modules/credenciais/credenciais.component';
import { CredencialCreateComponent } from './modules/credenciais/credenciais.create.component';
import { CredencialUpdateComponent } from './modules/credenciais/credenciais.update.component';
import { CredencialForm } from './modules/credenciais/credenciais.form';

import { EventosConvidadosComponent } from './modules/eventos_convidados/eventos_convidados.component';

//----------------------------------------------------------------------------
//Services
//----------------------------------------------------------------------------
import { ApiConfig } from './config/api.config';
import { ApiService } from './service/api.service';

//----------------------------------------------------------------------------
//Routes
//----------------------------------------------------------------------------
export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},

  { path: 'eventos', component: EventoComponent},
  { path: 'eventos/new', component: EventoCreateComponent},
  { path: 'eventos/:id', component: EventoUpdateComponent},

  { path: 'convidados', component: ConvidadoComponent},
  { path: 'convidados/new', component: ConvidadoCreateComponent},
  { path: 'convidados/:id', component: ConvidadoUpdateComponent},

  { path: 'credenciais', component: CredencialComponent},
  { path: 'credenciais/new', component: CredencialCreateComponent},
  { path: 'credenciais/:id', component: CredencialUpdateComponent},

  { path: 'eventos/:id/add_convidado', component: EventosConvidadosComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    LoginComponent,
    HomeComponent,
    EventoComponent,
    EventoCreateComponent,
    EventoUpdateComponent,
    EventosStatusPipe,
    ConvidadoComponent,
    ConvidadoCreateComponent,
    ConvidadoUpdateComponent,
    CredencialComponent,
    CredencialCreateComponent,
    CredencialUpdateComponent,
    EventosConvidadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    Ng2Webstorage,
    TextMaskModule,
    FlashMessagesModule,
    Ng2AutoCompleteModule
  ],
  providers: [
    DatePipe,
    ApiService,
    ApiConfig,
    BaseComponent,
    LoginForm,
    EventoForm,
    ConvidadoForm,
    CredencialForm
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
