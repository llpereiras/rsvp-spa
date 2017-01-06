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

//----------------------------------------------------------------------------
//Components
//----------------------------------------------------------------------------
import { AppComponent } from './app.component';
import { Injector } from "@angular/core";
import { ServiceLocator } from './service_locator';
import { BaseComponent } from './modules/base.component'
import { HomeComponent } from './modules/home/home.component';
import { EventoComponent } from './modules/eventos/eventos.component';
import { EventoCreateComponent } from './modules/eventos/eventos.create.component';
import { EventoUpdateComponent } from './modules/eventos/eventos.update.component';
import { EventoForm } from './modules/eventos/evento.form';
import { LoginComponent } from './modules/auth/login.component';
import { LoginForm } from './modules/auth/login.form';
import { EventosStatusPipe } from './pipes/eventos.status';
import { CapitalizePipe } from './pipes/capitalize';

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
];


@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    EventoCreateComponent,
    EventoUpdateComponent,
    HomeComponent,
    LoginComponent,
    EventosStatusPipe,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    Ng2Webstorage,
    TextMaskModule,
    FlashMessagesModule
  ],
  providers: [ApiService, ApiConfig, BaseComponent, EventoForm, LoginForm],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
