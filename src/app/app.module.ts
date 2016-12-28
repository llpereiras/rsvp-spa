import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { HomeComponent } from './home.component';
import { EventoComponent } from './evento.component';
import { LoginComponent } from './login.component';

import { ApiService } from './service/api.service';

import { Config } from './config/config'

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'eventos', component: EventoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [ApiService, {provide: Config, useValue: }],
  bootstrap: [AppComponent]
})
export class AppModule { }
