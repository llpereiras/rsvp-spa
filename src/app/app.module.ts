//----------------------------------------------------------------------------
//Modules
//----------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//----------------------------------------------------------------------------
//Components
//----------------------------------------------------------------------------
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { EventoComponent } from './modules/eventos/eventos.component';
import { LoginComponent } from './modules/auth/login.component';


//----------------------------------------------------------------------------
//Services
//----------------------------------------------------------------------------
import { ApiConfig } from './config/api.config';
import { ApiService } from './service/api.service';


//----------------------------------------------------------------------------
//Routes
//----------------------------------------------------------------------------
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
  providers: [ApiService, ApiConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
