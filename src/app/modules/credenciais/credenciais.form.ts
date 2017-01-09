import {Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()

export class CredencialForm {

  public fb: FormBuilder;

  constructor(public builder: FormBuilder ) {
    this.fb = builder;
  }

  getForm() {
    return this.fb.group({
        "id": [null],
        "descricao": [null, Validators.required]
    });
  }

  populate(credencial) {
    let formCredencial = this.getForm();
    formCredencial.controls['id'].setValue(credencial.id)
    formCredencial.controls['descricao'].setValue(credencial.descricao)
    return formCredencial;
  }

}
