import {Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable()

export class EventoForm {

  public fb: FormBuilder;

  constructor(public builder: FormBuilder, private datePipe: DatePipe ) {
    this.fb = builder;
  }

  transformDate(date) {
    return this.datePipe.transform(date, "dd/MM/yyyy");
  }

  getForm() {
    return this.fb.group({
        "id": [null],
        "nome": [null, Validators.required],
        "data": [null, Validators.required],
        "vigente": ['inativo', Validators.required]
    });
  }

  populate(evento) {
    let formEvento = this.getForm();
    formEvento.controls['id'].setValue(evento.id)
    formEvento.controls['nome'].setValue(evento.nome)
    formEvento.controls['data'].setValue(this.transformDate(evento.data))
    formEvento.controls['vigente'].setValue(evento.vigente)
    return formEvento;
  }

}
