import {Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()

export class EventoForm {

  public fb: FormBuilder;

  constructor(public builder: FormBuilder ) {

    this.fb = builder;

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
    formEvento.controls['data'].setValue(evento.data)
    formEvento.controls['vigente'].setValue(evento.vigente)
    return formEvento;
  }

}
