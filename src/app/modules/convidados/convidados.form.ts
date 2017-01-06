import {Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()

export class ConvidadoForm {

  public fb: FormBuilder;

  constructor(public builder: FormBuilder ) {
    this.fb = builder;
  }

  getForm() {
    return this.fb.group({
        "id": [null],
        "nome": [null, Validators.required],
        "email": [null, Validators.required],
        "telefone": [null, Validators.required]
    });
  }

  populate(convidado) {
    let formConvidado = this.getForm();
    formConvidado.controls['id'].setValue(convidado.id)
    formConvidado.controls['nome'].setValue(convidado.nome)
    formConvidado.controls['email'].setValue(convidado.email)
    formConvidado.controls['telefone'].setValue(convidado.telefone)
    return formConvidado;
  }

}
