import {Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()

export class LoginForm {

  public fb: FormBuilder;

  constructor(public builder: FormBuilder ) {
    this.fb = builder;
  }

  getForm() {
    return this.fb.group({
        "email": [null, Validators.required],
        "password": [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)]) ]
    });
  }

}
