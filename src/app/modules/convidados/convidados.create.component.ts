import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConvidadoForm } from './convidados.form';
import { BaseComponent } from './../base.component';
import { EventosAcompanhantesComponent } from './../eventos_acompanhantes/eventos_acompanhantes.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'convidados-create',
  templateUrl: './convidados.save.html'
})
export class ConvidadoCreateComponent extends BaseComponent{
  title = 'Convidado Novo';
  convidado: any = {};
  formConvidado: any;
  active_route: any;
  @Input() acompanhante: string;

  constructor(convidadoform:ConvidadoForm, active_route: ActivatedRoute){
    super();
    this.formConvidado = convidadoform.getForm();
  }

  save () {

    if (this.acompanhante == 'acompanhante') {
      this.formConvidado.controls['mostrar_listagem'].setValue(false);
    }

    this.saving = true;
    this.convidado = {"convidado": this.formConvidado.value};

    this.api.createConvidados(this.convidado).subscribe(
      (data: any) => {
        if (this.acompanhante == 'acompanhante') {
          let eva = new EventosAcompanhantesComponent(this.active_route);
          eva.updateListAcompanhantes(this.api);
        } else {
          this.flashMessagesService.show('Convidado salvo com sucesso!', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['convidados']);
        }
      },
      err => {
        this.saving = false;
        if (err.status == 401) {
          alert('Impossível obter os dados! Tente novamente.');
          return false;
        }
        if (err.status == 422) {
          this.flashMessagesService.show('Convidado não foi salvo!', { cssClass: 'alert-warning', timeout: 5000 });
          this.ver_erros_retorno(err._body);
          return false;
        }
      },
      () => {this.saving = false;} // complete
    );
  }

}
