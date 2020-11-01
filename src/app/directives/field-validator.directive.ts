import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[fieldValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FieldValidatorDirective, multi: true }
  ]
})
export class FieldValidatorDirective implements Validator {

  constructor() { }

  validate(control: FormControl) {
    if (control.value && (!control.value['_id'] || !control.value['nombre'])) {
      return { isEmpty: true }
    }
    return null;
  }
}
